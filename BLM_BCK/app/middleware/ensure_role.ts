import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { UserRole } from '../enums.js'

export default class DashboardPolicy extends BasePolicy {
    async before(user: User) {
      if (user?.userRole === UserRole.Admin ) {
        return true
      }
    }
  }