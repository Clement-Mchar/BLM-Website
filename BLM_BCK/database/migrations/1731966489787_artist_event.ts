import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ArtistEvent extends BaseSchema {
    protected tableName = 'artist_event'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('artist_id').notNullable()
            table.text('photo_url')
            table.uuid('event_id').notNullable()
            table.uuid('id').primary()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
