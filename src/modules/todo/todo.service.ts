import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { ITodo } from './todo.types'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private jwtService: JwtService,
  ) {}

  public getAll() {
    return this.todoRepository.find()
  }
  // public getByUser({ token }) {}

  async getAllByUser(id: number) {
    return this.todoRepository.find({ where: { userId: id } })
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
