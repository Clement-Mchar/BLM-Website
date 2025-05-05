import { WithTime } from '../mixins/with_time.js'
import Album from '#models/album'
import Artist from '#models/artist'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'

export default class Track extends compose(BaseModel, WithTime) {
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
}
