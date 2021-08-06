import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  checked: boolean

  @CreateDateColumn()
  created_at: Date

  @ManyToOne((type) => User, (user: User) => user.todos, {
    onDelete: 'CASCADE',
  })
  user: User
}
