export const UserRole = {
  Admin: 'ADMIN',
  Webmaster: 'WEBMASTER',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];