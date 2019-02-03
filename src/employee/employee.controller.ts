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
import { Employee } from './employee.entity';

@Controller('/api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.employeeService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id,
    @Body() createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    return this.employeeService.findByIdAndUpdate(id, createEmployeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.employeeService.findByIdAndDelete(id);
  }
}
