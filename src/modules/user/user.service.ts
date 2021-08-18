import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRegistrationDto } from '../auth/dto/user-registration.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public findOneByEmail(email: string): Promise<IUser> {
    return this.usersRepository.findOne({ email })
  }

  public create(user: UserRegistrationDto) {
    return this.usersRepository.save(user)
  }
  public removeById(id: number) {
    return this.usersRepository.delete({ id })
  }
  public removeAll() {
    return this.usersRepository.clear()
  }

  public update(id: number, body: CreateUserDto) {
    return this.usersRepository.update({ id }, body).then((result) => {
      return result
    })
  }

  public async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    })
    return user
  }
}
