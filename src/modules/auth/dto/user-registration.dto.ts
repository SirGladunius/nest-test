import { IsEmail, Length, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserRegistrationDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @Length(6, 20, {
    message: 'Длина пароля должна быть от 6 до 20 символов',
  })
  readonly password: string
}
