import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { UserSharedModule } from '../user/user-shared.module'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Module({
  imports: [
    JwtModule.register({ secret: 'SECRET', signOptions: { expiresIn: '24h' } }),
    UserSharedModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthSharedModule {}
