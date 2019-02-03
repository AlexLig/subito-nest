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
  constructor(private readonly service: EmployeeService) {}

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.service.create(createEmployeeDto);
  }

  @Get()
  findAllEmployees() {
    return this.service.findAll();
  }

  @Get(':id')
  findEmployee(@Param('id') id) {
    return this.service.findById(id);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id,
    @Body() createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    return this.service.findByIdAndUpdate(id, createEmployeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id) {
    return this.service.findByIdAndDelete(id);
  }
}
