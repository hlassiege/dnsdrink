import consola from 'consola'

export default defineTask({
    meta: {
        name: 'purge',
        description: 'Purge old quota entries from previous month',
    },
    async run({ payload, context }) {
        const db = hubDatabase()
        consola.log('Running quota purge task')
        await db.prepare('DELETE FROM quota WHERE strftime(\'%Y-%m\', created_at) < strftime(\'%Y-%m\', \'now\')').run()

        return { result: 'Success' }
    },
})
