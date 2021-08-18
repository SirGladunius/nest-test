import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { User } from '../user/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  text: string

  @ApiProperty()
  @Column({ default: false })
  checked: boolean

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date

  @ManyToOne((type) => User, (user) => user.todos, {
    onDelete: 'CASCADE',
  })
  user: User
}
