import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('videos', (table) => {
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.alterTable('videos', (table) => {
      table.dropColumns('created_at', 'updated_at')
    })
  }
}