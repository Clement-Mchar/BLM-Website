export interface CreateUserData {
  username: string
  password: string
  userRole: string
}

export interface UpdateUserData {
  username?: string
  password?: string
  userRole?: string
}
