import Artist from '#models/artist'
import { WithTime } from '../mixins/with_time.js'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { compose } from '@adonisjs/core/helpers'

export default class Event extends compose(BaseModel, WithTime) {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(event: Event) {
    event.id = randomUUID()
  }

  @column()
  declare name: string

  @attachment({ preComputeUrl: true })
  declare eventPhotos: Attachment | null

  @column()
  declare description: string | null

  @column.date()
  declare date: DateTime | null

  @column()
  declare location: string

  @column()
  declare reservation: string | null

  @manyToMany(() => Artist, {
    pivotTable: 'artists_events',
  })
  declare artists: ManyToMany<typeof Artist>
}
