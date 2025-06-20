import vine from '@vinejs/vine'
import { UserRole } from '../enums.js'

const baseUserSchema = {
  username: vine.string().minLength(3).maxLength(20),
  password: vine.string().minLength(8).maxLength(50).confirmed(),
  userRole: vine.enum(UserRole),
}

export const createUserValidator = vine.compile(vine.object(baseUserSchema))

export const updateUserValidator = vine.compile(
  vine.object({
    username: baseUserSchema.username.optional(),
    password: baseUserSchema.password.confirmed().optional(),
    userRole: baseUserSchema.userRole.optional(),
  })
)
