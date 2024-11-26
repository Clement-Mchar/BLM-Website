import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Artist extends BaseSchema {
    protected tableName = 'artists'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.string('spotify')
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.text('bio')
            table.string('albums')
            table.string('genre')
            table.string('twitter')
            table.text('photo_url')
            table.string('insta')
            table.integer('role_id')
            table.json('videos_urls')
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
