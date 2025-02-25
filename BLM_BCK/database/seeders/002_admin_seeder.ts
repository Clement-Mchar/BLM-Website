import { UserRole } from '../../app/enums.js'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const pwd = env.get('ADMIN_PASSWORD')
    const admin = new User()

    admin.username = "Don"
    admin.password = pwd as string;
    admin.userRole = UserRole.Admin
    admin.isAdmin = true

    await admin.save()
  }
}