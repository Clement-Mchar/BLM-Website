import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateNewCategoryColumns extends BaseSchema {
  async up() {
    this.schema.alterTable('posts', (table) => {
      table.enu('category', ['SPOTLIGHT', 'NEWS']).notNullable().defaultTo('NEWS')
    })

    this.schema.alterTable('videos', (table) => {
      table.enu('category', ['CLIP', 'LIVE', 'OTHER']).notNullable().defaultTo('OTHER')
    })
  }

  async down() {
    this.schema.alterTable('posts', (table) => {
      table.dropColumn('category')
    })

    this.schema.alterTable('videos', (table) => {
      table.dropColumn('category')
    })
  }
}

