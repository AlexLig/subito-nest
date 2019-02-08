import { Controller, Post, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post()
  async create(userDto: UserDto) {
    this.service.createUser(userDto);
  }
  @Get(':id')
  async read(@Param('id') id) {
    this.service.getUser(id);
  }
  @Delete(':id')
  async delete(@Param('id') id) {
    this.service.deleteUser(id);
  }
}
