import {H3Error} from 'h3'
import consola from 'consola'

async function checkQuotaExceeded() {
    const db = hubDatabase()

    // FIXME: this call should be done in a task but I can't get it to work in a task
    await db.exec('CREATE TABLE IF NOT EXISTS quota (id INTEGER primary key, created_at TEXT DEFAULT CURRENT_TIMESTAMP)')

    // check if the number of requests exceeds the quota for this current month
    const quota = 9500
    const count = await db.prepare('SELECT COUNT(*) as count FROM quota WHERE strftime(\'%Y-%m\', created_at) = strftime(\'%Y-%m\', \'now\')').first('count') as number

    if (count >= quota) {
        consola.warn('Quota exceeded')
        return true
    }

    return false
}

async function addToQuota() {
    const db = hubDatabase()
    await db.exec('INSERT INTO quota (created_at) VALUES (CURRENT_TIMESTAMP)')
    // FIXME: this call should be done in a task but I can't get it to work in a task
    await db.prepare('DELETE FROM quota WHERE strftime(\'%Y-%m\', created_at) < strftime(\'%Y-%m\', \'now\')').run()
}

export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    let domain = query.domain as string

    const apiKey = process.env.DOMAINR_API_KEY

    if (!apiKey) {
        console.error('API Key is missing')
        return createError({ statusCode: 500, statusMessage: 'API Key is missing', stack : ''})
    }

    if (!domain) {
        console.error('Domain is missing')
        return createError({ statusCode: 400, statusMessage: 'Domain is missing', stack : ''})
    }

    // si le domaine ne contient pas d'extension, testez avec .com
    if (!domain.includes('.')) {
        domain += '.com'
    }

    const url = `https://domainr.p.rapidapi.com/v2/status?domain=${domain}`
    try {
        const responseFromCache = await hubKV().get(domain)
        if (responseFromCache) {
            return responseFromCache
        }

        const quotaExceeded = await checkQuotaExceeded()
        if (quotaExceeded) {
            return createError({ statusCode: 429, statusMessage: 'Quota exceeded', stack : ''})
        }

        const response = await fetch(url, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'domainr.p.rapidapi.com',
            }
        })
        if (!response.ok) {
            throw new Error('Erreur lors de la vérification du domaine')
        }
        const data = await response.json()

        // Vérifiez le statut du domaine
        const domainStatus = data.status[0].status

        // un domaine est à vendre s'il est en summary : marketed, priced, premium
        const isForSale = ['marketed', 'parked', 'priced', 'premium'].some(element => domainStatus.includes(element))
        const isDomainActive = ['active'].some(element => domainStatus.includes(element))

        const summary = {
            domain,
            isForSale,
            isDomainActive
        }

        // Stockez le résultat dans le cache
        await hubKV().set(domain, summary, { expirationTtl: 60 * 60 * 24 * 30 }) // 30 days

        await addToQuota()

        return summary
    } catch (error: any) {
        console.error('Erreur lors de la vérification du domaine:', error)
        if (error instanceof H3Error) throw error
        return createError({ statusCode: 500, statusMessage: error.message, stack : ''})
    }


})


