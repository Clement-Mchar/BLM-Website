import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Artist from './artist.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Track from './track.js'
export default class Album extends BaseModel {
  @manyToMany(() => Artist, {
    pivotTable: 'artists_albums',
  })
  declare artists: ManyToMany<typeof Artist>

  @manyToMany(() => Track, {
    pivotTable: 'albums_tracks',
  })
  declare tracks: ManyToMany<typeof Track>

  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(album: Album) {
    album.id = randomUUID()
  }

  @column()
  declare name: string

  @column.date()
  declare date: DateTime

  @attachment({ preComputeUrl: true })
  declare cover: Attachment | null

  @column()
  declare spotifyLink: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
