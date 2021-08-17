import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { ITodo } from './todo.types'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private jwtService: JwtService,
  ) {}

  async getByUserId(id: any): Promise<ITodo[]> {
    return this.todoRepository.find({ user: id })
  }

  async getAllByUser(user: User) {
    return this.todoRepository.find({ user })
  }

  public create(todo: ITodo) {
    return this.todoRepository.save(todo)
  }

  public removeById(id: number) {
    return this.todoRepository.delete({ id })
  }

  public updateTodo(id: number, body: Todo) {
    return this.todoRepository.update({ id }, body).then((result) => {
      return result
    })
  }
}
