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
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('todoAuth')
@Controller('auth')
export class AuthController {
  public constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/registration')
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: String,
  })
  @ApiBody({ type: UserRegistrationDto })
  public async registration(@Body() body: UserRegistrationDto) {
    const user = await this.userService.findOneByEmail(body.email)
    if (user) {
      throw new HttpException('User is exist', HttpStatus.CONFLICT)
    }

    // Создать пользователя

    return this.authService.registration(body)
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: String,
  })
  @ApiBody({ type: UserLoginDto })
  public async login(@Body() body: UserLoginDto) {
    return this.authService.login(body)
  }
}
