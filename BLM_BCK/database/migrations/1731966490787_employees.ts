import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Employee extends BaseSchema {
    protected tableName = 'employees'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.text('photo_url')
            table.uuid('id').primary()
            table.string('role').notNullable()
            table.string('insta')
            table.text('bio')
            table.string('name').notNullable()

            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
