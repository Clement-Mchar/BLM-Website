import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'albums'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('spotify_link', 'link')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('link', 'spotify_link')
    })
  }
}