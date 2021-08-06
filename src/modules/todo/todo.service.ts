import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { ITodo } from './todo.types'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  public getAll() {
    return this.todoRepository.find()
  }

  public create(todo: ITodo) {
    return this.todoRepository.save(todo)
  }
}
