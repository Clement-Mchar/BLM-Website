import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const admin_role = new Role()

    admin_role.name = "admin"
    await admin_role.save()

    console.log(admin_role.$isPersisted) 
  }
}