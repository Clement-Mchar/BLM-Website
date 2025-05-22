import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.timestamp('true')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
