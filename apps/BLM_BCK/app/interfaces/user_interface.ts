import { UserRole } from "../enums.js"

export interface CreateUserData {
  username: string
  password: string
  userRole: UserRole
}

export interface UpdateUserData {
  username?: string
  password?: string
  userRole?: UserRole
}
