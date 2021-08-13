import { Module } from '@nestjs/common'
import { TodoController } from './todo.controler'
import { TodoSharedModule } from './todo-shared.module'
import { UserSharedModule } from '../user/user-shared.module'
import { AuthSharedModule } from '../auth/auth-shared.module'

@Module({
  imports: [TodoSharedModule, AuthSharedModule],
  controllers: [TodoController],
})
export class TodoModule {}
