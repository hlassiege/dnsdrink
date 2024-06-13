import consola from 'consola'

export default defineTask({
    meta: {
        name: 'schema',
        description: 'Run database init',
    },
    async run({ payload, context }) {
        const db = hubDatabase()
        consola.log('Running schema task')
        await db.exec('CREATE TABLE IF NOT EXISTS quota (id INTEGER primary key, created_at TEXT DEFAULT CURRENT_TIMESTAMP)')

        return { result: 'Success' }
    },
})
