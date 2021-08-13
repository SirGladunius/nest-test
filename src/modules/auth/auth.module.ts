import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthSharedModule } from './auth-shared.module'
import { JwtModule } from '@nestjs/jwt'
import { UserSharedModule } from '../user/user-shared.module'

@Module({
  imports: [AuthSharedModule, UserSharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
