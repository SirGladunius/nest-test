import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { AuthService } from '../auth/auth.service'
import CreateTodoDto from './dto/create-todo.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { User } from '../user/user.entity'

@Controller('todo')
export class TodoController {
  public constructor(
    private readonly todoService: TodoService,
    private authService: AuthService,
  ) {}

  @Get()
  public async findAllTodoByUser(@Headers() headers) {
    const tokenData = await this.authService.decodeToken(headers.token)
    console.log(this.todoService.getByUserId(tokenData.id))

    return this.todoService.getByUserId(tokenData.id)

    // return await this.todoService.getAllByUser(user)
  }
  @Post()
  public async createTodo(@Body() body: CreateTodoDto, @Headers() headers) {
    // console.log(headers.token)
    const user = await this.authService.decodeToken(headers.token) //передаёться с ковичками
    if (!user) {
      return {
        error: 'User not found',
        status: HttpStatus.NO_CONTENT,
      }
    }
    const todo = await this.todoService.create({
      text: body.text,
      checked: false,
      user,
    })
    return todo
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    console.log(id)
    return this.todoService.removeById(id)
  }

  @Put('/:id')
  editUser(@Param('id') id: number, @Body() body) {
    return this.todoService.updateTodo(id, body)
  }
  // @Get()
  // findByUser(@Headers() {token}) {
  //   return this.todoService.
  // }
}
