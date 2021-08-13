import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { TodoService } from './todo.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '24h' } }),
  ],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoSharedModule {}
