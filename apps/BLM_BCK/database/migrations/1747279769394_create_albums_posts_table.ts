import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'albums_posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('album_id').notNullable().references('albums.id').onDelete('CASCADE')
      table.uuid('post_id').notNullable().references('posts.id').onDelete('CASCADE')
      table.unique(['album_id', 'post_id'])
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}