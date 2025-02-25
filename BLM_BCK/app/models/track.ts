import { DateTime } from 'luxon'
import Album from '#models/album'
import Artist from '#models/artist'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Track extends BaseModel {
  static selfAssignPrimaryKey = true

  @manyToMany(() => Album, {
    pivotTable: 'albums_tracks',
  })
  declare albums: ManyToMany<typeof Album>

  @manyToMany(() => Artist, {
    pivotTable: 'artists_tracks',
  })
  declare artists: ManyToMany<typeof Artist>

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(track: Track) {
    track.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare length: string

  @column()
  declare photoUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
