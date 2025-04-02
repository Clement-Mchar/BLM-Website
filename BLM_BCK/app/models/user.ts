import { UserRole } from '../enums.js'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Post from './post.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare userRole: UserRole

  @column()
  declare isAdmin: boolean

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('utc').toFormat('dd/MM/yyyy HH:mm') : value
    },
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('utc').toFormat('dd/MM/yyyy HH:mm') : value
    },
  })
  declare updatedAt: DateTime | null
}
