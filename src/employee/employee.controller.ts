import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Controller('/api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
