import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../modules/user/user.entity'
import { UserModule } from '../modules/user/user.module'
import { TodoModule } from '../modules/todo/todo.module'
import { Todo } from '../modules/todo/todo.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'qQ12345!',
      database: 'todo',
      entities: [User, Todo],
      synchronize: true,
    }),
    UserModule,
    TodoModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
