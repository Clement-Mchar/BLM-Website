import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Post extends BaseSchema {
    protected tableName = 'posts'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('title').notNullable()
            table.text('body').notNullable()
            table.string('author').notNullable()
            table.json('post_photos').nullable()
            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').nullable()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
