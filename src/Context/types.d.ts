import * as React from "react"

export type User = {
    username: string | null
  }
export type Count = number



// context types for useContext
export type ContextType = {
    user: User
    setUser: SetUser
    count: Count
    setCount: SetCount
}
export type APIContextType = {
    getUsers: GetUsers
}
// function types
export type SetCount = (count: number) => void
export type SetUser = (user: User) => void

// api types
export type GetUsers = () => Promise<User[]>
