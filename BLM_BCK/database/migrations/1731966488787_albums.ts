import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Album extends BaseSchema {
    protected tableName = 'albums'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.date('date').notNullable()
            table.text('photo_url')
            table.uuid('tracks_ids').notNullable()
            table.uuid('artist_id').notNullable()
            table.string('spotify_link')
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
