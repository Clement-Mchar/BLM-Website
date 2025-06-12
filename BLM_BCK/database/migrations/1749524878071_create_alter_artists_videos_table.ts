import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'artists_videos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropPrimary()
      table.dropColumn('id')
      table.dropUnique(['artist_id', 'video_id'])
      table.primary(['artist_id', 'video_id'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropPrimary()
      table.uuid('id').primary()
      table.unique(['artist_id', 'video_id'])
    })
  }
}