import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { IUser } from './user.types'
import {
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import CreateTodoDto from '../todo/dto/create-todo.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRegistrationDto } from '../auth/dto/user-registration.dto'
import { User } from './user.entity'

@ApiTags('todoUser')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'get user by id',
    type: User,
  })
  public async getOneById(@Param() { email }): Promise<IUser> {
    return await this.userService.findOneByEmail(email)
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'create user',
    type: User,
  })
  @ApiBody({ type: UserRegistrationDto })
  create(@Body() body: UserRegistrationDto) {
    return this.userService.create(body)
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: User,
  })
  remove(@Param('id') id: number) {
    return this.userService.removeById(id)
  }

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'edit user',
    type: User,
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({ type: CreateUserDto })
  editUser(@Param('id') id: number, @Body() body: CreateUserDto) {
    return this.userService.update(id, body)
  }

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: User,
  })
  clearAll() {
    return this.userService.removeAll()
  }
}
