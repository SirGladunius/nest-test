import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { AuthSharedModule } from './auth-shared.module'
import { UserLoginDto } from './dto/user-login.dto'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from '../user/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private useService: UserService,
    private jwtService: JwtService,
  ) {}

  public async decodeToken(token: string) {
    if (!token) {
      throw new Error('Нет токена')
    }
    return this.jwtService.verify(token)
  }

  public async registration(userDto: UserRegistrationDto) {
    const user = await this.useService.getUserByEmail(userDto.email)
    if (user) {
      throw new HttpException(
        'Пользователь с данной почтой уже существует',
        HttpStatus.BAD_REQUEST,
      )
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const User = await this.useService.create({
      ...userDto,
      password: hashPassword,
    })
    return this.generateToken(User)
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  public async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  private async validateUser(userDto: UserLoginDto) {
    const user = await this.useService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({
      message: 'Некоректный емеил или пароль!',
    })
  }
}
