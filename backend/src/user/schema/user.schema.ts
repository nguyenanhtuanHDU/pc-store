export type Role = 'user' | 'admin'

export interface IUser {
    username: string
    password: string
    roles: Role[]
}