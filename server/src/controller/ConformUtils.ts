import type { User } from "./Types"

export const conformToUser = (user: User): User => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
}
