import { WithTime } from '../mixins/with_time.js'
import Artist from '#models/artist'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithUuid } from '../mixins/with_uuid.js'
import { VideoCategory } from '../enums.js'

export default class Video extends compose(BaseModel, WithTime, WithUuid) {

  @manyToMany(() => Artist, {
    pivotTable: 'artists_videos',
  })
  declare artists: ManyToMany<typeof Artist>

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare category: VideoCategory
}
