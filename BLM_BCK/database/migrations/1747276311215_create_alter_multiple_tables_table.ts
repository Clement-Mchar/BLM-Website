import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.alterTable('artists', (table) => {
      table.dropColumn('videos_urls')
    })
    this.schema.alterTable('tracks', (table) => {
      table.dropColumn('photo_url')
      table.dropColumn('length')
      table.string('spotify').notNullable()
    })
    this.schema.alterTable('posts', (table) => {
      table.renameColumn('post_photos', 'header')
    })
  }

  async down() {
    this.schema.alterTable('artists', (table) => {
      table.json('videos_urls').nullable()
    })
    this.schema.alterTable('tracks', (table) => {
      table.json('photo_url').nullable()
      table.string('length').notNullable()
      table.dropColumn('spotify')
    })
    this.schema.alterTable('posts', (table) => {
      table.renameColumn('header', 'post_photos')
    })
  }
}