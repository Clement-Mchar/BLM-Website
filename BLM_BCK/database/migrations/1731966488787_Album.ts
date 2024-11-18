import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Album extends BaseSchema {
    protected tableName = 'Album'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.date('date').notNullable()
            table.text('photo_url')
            table.string('name').notNullable()
            table.uuid('id').primary()
            table.string('tracks').notNullable()
            table.uuid('artist_id').notNullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
