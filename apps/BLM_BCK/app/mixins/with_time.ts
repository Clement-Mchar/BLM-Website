import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { NormalizeConstructor } from '@adonisjs/core/types/helpers'

export const WithTime = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  class MixinClass extends superclass {
    @column.dateTime({
      autoCreate: true,
      serialize: (value: DateTime | null) => {
        return value ? value.setZone('Europe/Paris').toFormat('dd/MM/yyyy HH:mm') : value
      },
    })
    declare createdAt: DateTime

    @column.dateTime({
      autoCreate: true,
      autoUpdate: true,
      serialize: (value: DateTime | null) => {
        return value ? value.setZone('Europe/Paris').toFormat('dd/MM/yyyy HH:mm') : value
      },
    })
    declare updatedAt: DateTime | null
  }
  return MixinClass
}
