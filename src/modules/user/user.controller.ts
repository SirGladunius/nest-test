import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getAll()
  }
  @Post()
  create(@Body() body) {
    return this.userService.create(body)
  }
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.userService.removeById(id)
  }

  @Put('/:id')
  editUser(@Param('id') id: number, @Body() body) {
    return this.userService.update(id, body)
  }

  @Delete()
  clearAll() {
    return this.userService.removeAll()
  }
}
