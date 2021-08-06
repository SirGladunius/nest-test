import { Get, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-uset.dto'

@Injectable()
export class User {
  // constructor(private readonly userService: UserService) {}

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get
  getAll() {
    return
  }
}
