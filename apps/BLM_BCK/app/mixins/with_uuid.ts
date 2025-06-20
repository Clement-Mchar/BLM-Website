import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { randomUUID } from 'node:crypto'

export const WithUuid = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  class MixinClass extends superclass {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(modelInstance: InstanceType<T> & { id: string }) {
      modelInstance.id = randomUUID()
    }
  }
  return MixinClass
}
