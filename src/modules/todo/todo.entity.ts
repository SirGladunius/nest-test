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

  @Column({ default: false })
  checked: boolean

  @CreateDateColumn()
  created_at: Date

  @ManyToOne((type) => User, (user) => user.todos, {
    onDelete: 'CASCADE',
  })
  user: User
}
