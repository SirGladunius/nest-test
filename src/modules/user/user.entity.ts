import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Todo } from '../todo/todo.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany((type) => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
  todos: Todo[]
}
