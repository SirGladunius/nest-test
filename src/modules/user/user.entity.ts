import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Todo } from '../todo/todo.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  email: string

  @ApiProperty()
  @Column()
  password: string

  @OneToMany((type) => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
  todos: Todo[]
}
