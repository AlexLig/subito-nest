import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async createUser(userDto: UserDto) {}
  async getUser(id: string) {}
  async deleteUser(id: string) {}
}
