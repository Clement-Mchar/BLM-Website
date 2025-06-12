import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DropCategoryColumns extends BaseSchema {
  async up() {
    this.schema.alterTable('posts', (table) => {
      table.dropColumn('category')
    })

    this.schema.alterTable('videos', (table) => {
      table.dropColumn('category')
    })
  }

  async down() {
    this.schema.alterTable('posts', (table) => {
      table.enu('category', ['NEWS', 'SPOTLIGHT', 'EVENT']).notNullable()
    })

    this.schema.alterTable('videos', (table) => {
      table.enu('category', ['CLIP', 'LIVE', 'INTERVIEW', 'ANOUNCE']).notNullable()
    })
  }
}