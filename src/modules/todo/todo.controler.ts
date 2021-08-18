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
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserRegistrationDto } from '../auth/dto/user-registration.dto'
import { Todo } from './todo.entity'

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  public constructor(
    private readonly todoService: TodoService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'all todo by user',
    type: [Todo],
  })
  public async findAllTodoByUser(@Headers() headers) {
    const tokenData = await this.authService.decodeToken(headers.token)
    console.log(this.todoService.getByUserId(tokenData.id))

    return this.todoService.getByUserId(tokenData.id)

    // return await this.todoService.getAllByUser(user)
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'create user',
    type: Todo,
  })
  @ApiBody({ type: CreateTodoDto })
  @ApiHeader({ name: 'token' })
  public async createTodo(@Body() body: CreateTodoDto, @Headers() headers) {
    console.log(headers.token)
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
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: Todo,
  })
  remove(@Param('id') id: number) {
    console.log(id)
    return this.todoService.removeById(id)
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'edit user',
    type: Todo,
  })
  @ApiBody({ type: CreateTodoDto })
  editUser(@Param('id') id: number, @Body() body: CreateTodoDto) {
    return this.todoService.updateTodo(id, body)
  }
  // @Get()
  // findByUser(@Headers() {token}) {
  //   return this.todoService.
  // }
}
