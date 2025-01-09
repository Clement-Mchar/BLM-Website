import Artist from '#models/artist'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'

export default class Event extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(event: Event) {
    event.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare photoUrl: string | null

  @column()
  declare description: string

  @column.date()
  declare date: DateTime

  @column()
  declare location: string

  @column()
  declare reservation: string

  @manyToMany(() => Artist)
  declare artists: ManyToMany<typeof Artist>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}