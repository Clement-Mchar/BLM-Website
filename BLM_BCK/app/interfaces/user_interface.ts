export interface CreateUserData {
  username: string
  password: string
  role: string
}

export interface UpdateUserData {
  username?: string
  password?: string
  role?: string
}
