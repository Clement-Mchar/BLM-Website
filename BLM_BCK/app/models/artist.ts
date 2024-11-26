import { DateTime } from 'luxon'
import Album from '#models/album'
import { randomUUID } from 'node:crypto'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, hasMany} from '@adonisjs/lucid/orm'

export default class Artist extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(artist: Artist) {
    artist.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare bio: string

  @hasMany(() => Album)
  declare albums: HasMany<typeof Album>

  @column()
  declare genre: string

  @column()
  declare twitter: string

  @column()
  declare insta: string

  @column()
  declare role_id: number

  @column()
  declare videos_urls: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}