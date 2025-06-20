import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.alterTable('posts', (table) => {
      table.renameColumn('post_photos', 'header')
    })
  }

  async down() {
    this.schema.alterTable('posts', (table) => {
      table.renameColumn('header', 'post_photos')
    })
  }
}