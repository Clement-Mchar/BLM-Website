import User from "#models/user"

export class UserService {

    async all() {
        const users = await User.all()
        return users
    }
}