import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'artists_posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
      table.uuid('post_id').notNullable().references('posts.id').onDelete('CASCADE')
      table.unique(['artist_id', 'post_id'])
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}