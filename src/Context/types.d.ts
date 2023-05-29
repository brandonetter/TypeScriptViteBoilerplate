import * as React from "react"

export type User = {
    username?: string | null
    id?: number | null
    email?: string | null
    password?: string | null
    firstName?: string | null
    lastName?: string | null
}


export type Count = number



// context types for useContext
export type ContextType = {
    user: User
    setUser: SetUser
    count: Count
    setCount: SetCount
}
// context types for APIContext
export type APIContextType = {
    getUsers: GetUsers,
    registerUser: RegisterUser,
    loginUser: LoginUser
}

// function types
export type SetCount = (count: number) => void
export type SetUser = (user: User) => void

// api types
export type GetUsers = () => Promise<User[]>
export type RegisterUser = (user: User) => Promise<User>
export type LoginUser = (user: User) => Promise<User>
