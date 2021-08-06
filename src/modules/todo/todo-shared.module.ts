import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoSharedModule {}
