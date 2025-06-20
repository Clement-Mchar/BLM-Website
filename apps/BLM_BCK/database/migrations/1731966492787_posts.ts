import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Post extends BaseSchema {
    protected tableName = 'posts'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('title').notNullable()
            table.text('body').notNullable()
            table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
            table.json('post_photos').nullable()
            table.timestamps(true)
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
