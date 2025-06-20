import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistAlbum extends BaseSchema {
    protected tableName = 'artists_albums'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('artist_id').notNullable().references('artists.id').onDelete('CASCADE')
            table.uuid('album_id').notNullable().references('albums.id').onDelete('CASCADE')
            table.unique(['artist_id', 'album_id'])
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}