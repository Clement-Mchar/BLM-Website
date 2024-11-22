import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'

export default class Track extends BaseModel {
  static selfAssignPrimaryKey = true

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
  declare photo_url: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}