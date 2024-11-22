import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistEvent extends BaseSchema {
    protected tableName = 'artists_events'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('artist_id').notNullable()
            table.uuid('event_id').notNullable()
            table.uuid('id').primary()
            table.unique(['artist_id', 'event_id'])
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}