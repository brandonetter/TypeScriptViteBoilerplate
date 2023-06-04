import * as React from "react"

export type User = {
    username?: string | null
    id?: number | null
    email?: string | null
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    status?: string | null
}


export type Count = number



// context types for useContext
export type ContextType = {
    user: User
    setUser: SetUser
    count: Count
    setCount: SetCount
    modal: Modal
    setModal: SetModal
}
// context types for APIContext
export type APIContextType = {
    getUsers: GetUsers,
    registerUser: RegisterUser,
    loginUser: LoginUser,
    logout: Logout,
    updateAge: UpdateAge,
    allUsers: AllUsers
}

// function types
export type SetCount = (count: number) => void
export type SetUser = (user: User) => void
export type SetModal = (modal: Modal) => void
export type Modal = {
    login: boolean,
}

// api types
export type GetUsers = () => Promise<User[]>
export type RegisterUser = (user: User) => Promise<User>
export type LoginUser = (email:string,password:string) => Promise<User>
export type Logout = () => Promise<void>
export type UpdateAge = (age:number) => Promise<User>
export type AllUsers = () => Promise<User[]>
