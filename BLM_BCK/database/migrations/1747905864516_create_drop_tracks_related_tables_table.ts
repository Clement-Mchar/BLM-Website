import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.dropTable('artists_tracks')
    this.schema.dropTable('albums_tracks')
    this.schema.dropTable('tracks')
  }

  async down() {}
}
