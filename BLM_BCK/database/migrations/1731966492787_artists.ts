import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Artist extends BaseSchema {
    protected tableName = 'artists'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.string('spotify')
            table.enu('role',[''])
            table.uuid('id').primary()
            table.text('bio')
            table.string('albums')
            table.string('twitter')
            table.string('genre')
            table.text('photo_url')
            table.string('insta')
            table.string('name').notNullable()
            table.text('videos_urls')
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
