import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Artist extends BaseSchema {
    protected tableName = 'artists'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.string('spotify').nullable()
            table.uuid('id').primary()
            table.string('name').notNullable()
            table.text('bio').nullable()
            table.string('genre').nullable()
            table.string('twitter').nullable()
            table.json('avatar').nullable()
            table.string('insta').nullable()
            table.string('role').nullable()
            table.json('videos_urls').nullable()
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
