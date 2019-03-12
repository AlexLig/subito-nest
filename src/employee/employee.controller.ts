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
import { CreateEmployeeDto } from './employee.dto';

@Controller('/api/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    // has extra property "employerId" that employeeService does not need. TODO: remove it and tranform the obj to the Employee class.
    return await this.employeeService.create(createEmployeeDto);
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
    @Body() employeeDto: Partial<CreateEmployeeDto>,
  ) {
    const employeeToUpdate = await this.employeeService.findById(id);
    if (!employeeToUpdate) throw new HttpException('Employee Not found', 404);

    return this.employeeService.findByIdAndUpdate(id, employeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id) {
    return this.employeeService.findByIdAndDelete(id);
  }
}
