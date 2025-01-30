import { DateTime } from 'luxon'
import Event from '#models/event'
import Album from '#models/album'
import { randomUUID } from 'node:crypto'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, hasMany, manyToMany} from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
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
  declare bio: string | null

  @attachment({ preComputeUrl: true })
  declare avatar: Attachment | null
  
  @hasMany(() => Album)
  declare albums: HasMany<typeof Album>

  @column()
  declare genre: string | null

  @column()
  declare twitter: string | null

  @column()
  declare insta: string | null

  @column()
  declare role: string | null

  @column()
  declare videosUrls: string[] | null

  @manyToMany(() => Event)
  declare events: ManyToMany<typeof Event>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}