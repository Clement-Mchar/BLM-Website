import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistEvent extends BaseSchema {
    protected tableName = 'artist_event'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('artist_id').notNullable().unsigned().references('artists.id')
            table.uuid('event_id').notNullable().unsigned().references('events.id')
            table.unique(['artist_id', 'event_id'])
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}