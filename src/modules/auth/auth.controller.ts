import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { UserService } from '../user/user.service'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from '../user/user.entity'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  public constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/registration')
  public async registration(@Body() body: UserRegistrationDto) {
    console.log('body: ', body)

    const user = await this.userService.findOneByEmail(body.email)
    if (user) {
      throw new HttpException('User is exist', HttpStatus.CONFLICT)
    }

    // Создать пользователя

    return this.authService.registration(body)
  }

  @Post('/login')
  public async login(@Body() body: UserLoginDto) {
    return this.authService.login(body)
  }
}
