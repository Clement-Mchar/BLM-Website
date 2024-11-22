import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Track extends BaseSchema {
    protected tableName = 'tracks'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.string('length').notNullable()
            table.bigInteger('artists').notNullable()
            table.text('photo_url')
            table.uuid('album_id').notNullable()

            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
