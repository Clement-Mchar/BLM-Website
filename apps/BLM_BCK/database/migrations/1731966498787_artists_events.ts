import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistEvent extends BaseSchema {
    protected tableName = 'artists_events'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
            table.uuid('event_id').notNullable().references('events.id').onDelete('CASCADE')
            table.unique(['artist_id', 'event_id'])
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}