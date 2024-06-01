import {H3Error} from 'h3'

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
        const domainStatus = data.status[0].summary

        // un domaine est à vendre s'il est en summary : marketed, priced, premium
        const isForSale = ['marketed', 'priced', 'premium'].includes(domainStatus)
        const isDomainActive = domainStatus !== 'inactive'

        const summary = {
            isForSale,
            isDomainActive
        }

        // Stockez le résultat dans le cache
        await hubKV().set(domain, summary, { expirationTtl: 60 * 60 * 24 }) // 24 heures

        return {
            domain,
            ...summary
        }
    } catch (error: any) {
        console.error('Erreur lors de la vérification du domaine:', error)
        if (error instanceof H3Error) throw error
        return createError({ statusCode: 500, statusMessage: error.message, stack : ''})
    }


})


