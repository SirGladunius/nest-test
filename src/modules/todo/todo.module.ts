import { Module } from '@nestjs/common'
import { TodoController } from './todo.controler'
import { TodoSharedModule } from './todo-shared.module'
import { UserSharedModule } from '../user/user-shared.module'

@Module({
  imports: [TodoSharedModule],
  controllers: [TodoController],
})
export class TodoModule {}
