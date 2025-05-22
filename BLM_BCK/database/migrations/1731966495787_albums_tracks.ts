import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AlbumTrack extends BaseSchema {
    protected tableName = 'albums_tracks'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('album_id').notNullable().references('albums.id').onDelete('CASCADE')
            table.uuid('track_id').notNullable().references('tracks.id').onDelete('CASCADE')
            table.unique(['album_id', 'track_id'])
            table.timestamps(true)
        })
    }

    public async down () {
    }
}