import { DateTime } from 'luxon'
import Event from '#models/event'
import Album from '#models/album'
import { randomUUID } from 'node:crypto'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Track from './track.js'
export default class Artist extends BaseModel {
  static selfAssignPrimaryKey = true

  @manyToMany(() => Event, {
    pivotTable: 'artists_events',
  })
  declare events: ManyToMany<typeof Event>

  @manyToMany(() => Album, {
    pivotTable: 'artists_albums',
  })
  declare albums: ManyToMany<typeof Album>

  @manyToMany(() => Track, {
    pivotTable: 'artists_tracks',
  })
  declare tracks: ManyToMany<typeof Track>

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
