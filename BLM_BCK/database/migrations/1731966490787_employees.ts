import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Employee extends BaseSchema {
    protected tableName = 'employees'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.json('avatar').nullable()
            table.uuid('id').primary()
            table.string('role').nullable()
            table.string('insta').nullable()
            table.text('bio').nullable()
            table.string('name').notNullable()
            table.timestamps(true)
        })
    }

    public async down () {
    }
}
