import { IsEmail, Length, MinLength } from 'class-validator'

export class UserRegistrationDto {
  @IsEmail()
  readonly email: string

  @Length(6, 20, {
    message: 'Длина пароля должна быть от 6 до 20 символов',
  })
  readonly password: string
}
