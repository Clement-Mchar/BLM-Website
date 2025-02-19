import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Album extends BaseSchema {
    protected tableName = 'albums'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.date('date').nullable()
            table.json('cover').nullable()
            table.uuid('tracks_ids').nullable()
            table.uuid('artist_id').nullable()
            table.string('spotify_link').nullable()
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
