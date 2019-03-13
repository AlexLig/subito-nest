import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './employee.dto';

@Controller('/api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return await this.employeeService.create(employeeDto);
  }

  @Get()
  findAllEmployees() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findEmployee(@Param('id') id) {
    return this.employeeService.findById(id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id,
    @Body() employeeDto: Partial<EmployeeDto>,
  ) {
    return this.employeeService.findByIdAndUpdate(id, employeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id) {
    return this.employeeService.findByIdAndDelete(id);
  }
}
