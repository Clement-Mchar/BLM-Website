import vine from '@vinejs/vine'
import { UserRole } from '../enums.js'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).maxLength(20),
    password: vine.string().minLength(8).maxLength(50).confirmed(),
    role: vine.enum(UserRole),
  })
)