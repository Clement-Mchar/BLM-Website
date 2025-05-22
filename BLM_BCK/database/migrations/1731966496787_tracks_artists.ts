import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistTrack extends BaseSchema {
    protected tableName = 'artists_tracks'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
            table.uuid('track_id').notNullable().references('tracks.id').onDelete('CASCADE')
            table.unique(['artist_id', 'track_id'])
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}