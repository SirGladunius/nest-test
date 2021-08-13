import { User } from '../user/user.entity'

export interface ITodo {
  text: string
  checked: boolean
  user: User
}
