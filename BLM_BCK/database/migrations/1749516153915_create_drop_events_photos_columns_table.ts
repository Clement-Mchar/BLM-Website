import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('event_photos')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('event_photos').nullable()
    })
  }
}
