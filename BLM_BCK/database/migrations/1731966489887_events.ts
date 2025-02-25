import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Event extends BaseSchema {
    protected tableName = 'events'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.json('event_photos').nullable()
            table.text('description').nullable()
            table.date('date').nullable()
            table.string('location').nullable()
            table.string('reservation').nullable
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
