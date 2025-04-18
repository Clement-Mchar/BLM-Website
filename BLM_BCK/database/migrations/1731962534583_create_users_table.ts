import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username').unique().notNullable()
      table.string('password').notNullable()
      table.enu('user_role', ["ADMIN", "WEBMASTER"]).notNullable()
      table.boolean('is_admin').defaultTo(false).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
}
}