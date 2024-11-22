import { DateTime } from 'luxon'

import { randomUUID } from 'node:crypto'
import { BaseModel, column, beforeCreate} from '@adonisjs/lucid/orm'

export default class Artist extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(artist: Artist) {
    artist.id = randomUUID()
  }


  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}