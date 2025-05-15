export const UserRole = {
  Admin: 'ADMIN',
  Webmaster: 'WEBMASTER',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const VideoCategory = {
  Clip: 'CLIP',
  Interview: 'INTERVIEW',
  Live: 'LIVE',
  Anounce: 'ANOUNCE',
} as const

export type VideoCategory = (typeof VideoCategory)[keyof typeof VideoCategory];

export const PostCategory = {
  News: 'NEWS',
  Spotlight: 'SPOTLIGHT',
  Event: 'EVENT',
} as const

export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory];