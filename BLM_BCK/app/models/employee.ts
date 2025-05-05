import { WithTime } from '../mixins/with_time.js'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { compose } from '@adonisjs/core/helpers'
export default class Employee extends compose(BaseModel, WithTime) {

  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(employee: Employee) {
    employee.id = randomUUID()
  }

  @column()
  declare role: string | null

  @column()
  declare insta: string | null

  @column()
  declare bio: string | null

  @column()
  declare name: string

  @attachment({ preComputeUrl: true })
  declare avatar: Attachment | null
}