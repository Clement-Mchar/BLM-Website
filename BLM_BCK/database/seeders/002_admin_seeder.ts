import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const admin_role = await Role.findOrFail(1)
    const pwd = env.get('ADMIN_PASSWORD')
    const admin = new User()

    admin.fullName = "Don"
    admin.password = pwd as string;
    admin.role_id = admin_role.id

    admin.save()

    console.log(admin_role.id) 
  }
}