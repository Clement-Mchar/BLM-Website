import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.dropTable('artists_tracks')
    this.schema.dropTable('albums_tracks')
    this.schema.dropTable('tracks')
  }

  async down() {
    this.schema.createTable('tracks', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('length').notNullable()
      table.json('photo_url').nullable()
      table.timestamps(true)
    })
    this.schema.createTable('artists_tracks', (table) => {
      table.uuid('id').primary()
      table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
      table.uuid('track_id').notNullable().references('tracks.id').onDelete('CASCADE')
      table.unique(['artist_id', 'track_id'])
      table.timestamps(true)
    })
    this.schema.createTable('albums_tracks', (table) => {
      table.uuid('id').primary()
      table.uuid('album_id').notNullable().references('albums.id').onDelete('CASCADE')
      table.uuid('track_id').notNullable().references('tracks.id').onDelete('CASCADE')
      table.unique(['album_id', 'track_id'])
      table.timestamps(true)
    })
  }
}
