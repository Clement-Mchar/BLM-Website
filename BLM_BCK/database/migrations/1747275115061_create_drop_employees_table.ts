import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.dropTable(this.tableName)
  }

  async down() {
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
}
