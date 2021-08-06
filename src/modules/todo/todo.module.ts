import { Module } from '@nestjs/common'
import { TodoController } from './todo.controler'
import { TodoSharedModule } from './todo-shared.module'

@Module({
  imports: [TodoSharedModule],
  controllers: [TodoController],
})
export class TodoModule {}
