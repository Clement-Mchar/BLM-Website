import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'artists_videos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
      table.uuid('video_id').notNullable().references('videos.id').onDelete('CASCADE')
      table.unique(['artist_id', 'video_id'])
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}