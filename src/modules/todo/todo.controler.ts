import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common'
import { Todo } from './todo.entity'
import { TodoService } from './user.service'
import { ITodo } from './todo.types'
import { publish } from 'rxjs'
import CreateTodoDto from './dto/create-todo.dto'

@Controller('todo')
export class TodoController {
  public constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodo() {
    return this.todoService.getAll()
  }
}
