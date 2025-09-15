import { UserRole } from '../../app/enums.js'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const pwd = env.get('ADMIN_PASSWORD')
    await User.createMany([
      {
        username : "Don",
        password : pwd as string,
        userRole : UserRole.Admin,
        isAdmin : true,
      },
      { username: "Milo", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Zoe", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Leo", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Ivy", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Nina", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Owen", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Eli", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Noa", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Liam", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Jade", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Max", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Amy", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Ezra", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Maya", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Hugo", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Nico", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Léa", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Theo", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Emma", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Ray", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Sia", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Yuna", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Tao", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Gus", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Ava", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Mira", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Kai", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Nils", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
      { username: "Zia", password: "aaaaaaaa", userRole: UserRole.Webmaster, isAdmin: false },
    ])

  }
}