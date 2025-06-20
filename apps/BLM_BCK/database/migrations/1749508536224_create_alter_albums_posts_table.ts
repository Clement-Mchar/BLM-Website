import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'albums_posts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropPrimary()
      table.dropColumn('id')
      table.dropUnique(['album_id', 'post_id'])
      table.primary(['album_id', 'post_id'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropPrimary()
      table.uuid('id').primary()
      table.unique(['album_id', 'post_id'])
    })
  }
}