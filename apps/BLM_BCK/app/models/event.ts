import Artist from '#models/artist'
import { WithTime } from '../mixins/with_time.js'
import { DateTime } from 'luxon'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'

export default class Event extends compose(BaseModel, WithUuid, WithTime) {
  @manyToMany(() => Artist, {
    pivotTable: 'artists_events',
  })
  declare artists: ManyToMany<typeof Artist>

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.date()
  declare date: DateTime | null

  @column()
  declare location: string

  @column()
  declare reservation: string | null
}
