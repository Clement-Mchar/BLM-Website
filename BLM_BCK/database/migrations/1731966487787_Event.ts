import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Event extends BaseSchema {
    protected tableName = 'Event'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.string('name').notNullable()
            table.text('photo_url')
            table.uuid('id').primary()
            table.text('description').notNullable()
            table.date('date').notNullable()
            table.string('location').notNullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
