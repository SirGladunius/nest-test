import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-uset.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public getAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  public create(user: User) {
    return this.usersRepository.save(user)
  }
  public removeById(id: number) {
    return this.usersRepository.delete({ id })
  }
  public removeAll() {
    return this.usersRepository.clear()
  }
  // public editById(id:number,body:User){
  //   return this.usersRepository.
  // }

  public update(id: number, body: User) {
    return this.usersRepository.update({ id }, body).then((result) => {
      return result
    })
  }
}
