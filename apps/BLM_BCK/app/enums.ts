export const UserRole = {
  Admin: 'ADMIN',
  Webmaster: 'WEBMASTER',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const VideoCategory = {
  Clip: 'CLIP',
  Live: 'LIVE',
  Other: 'OTHER',
} as const

export type VideoCategory = (typeof VideoCategory)[keyof typeof VideoCategory];

export const PostCategory = {
  News: 'NEWS',
  Spotlight: 'SPOTLIGHT',
} as const

export type PostCategory = (typeof PostCategory)[keyof typeof PostCategory];