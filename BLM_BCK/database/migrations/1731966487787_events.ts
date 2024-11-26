import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Event extends BaseSchema {
    protected tableName = 'events'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.text('photo_url')
            table.text('description')
            table.date('date')
            table.string('location')
            table.string('reservation')
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
