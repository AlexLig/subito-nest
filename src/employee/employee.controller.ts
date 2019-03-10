import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployerService } from 'src/employer/employer.service';
import { validate } from 'class-validator';

@Controller('/api/employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employerService: EmployerService,
  ) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const { employerId, vat } = createEmployeeDto;
    const employer = await this.employerService.findById(employerId);
    // has extra property "employerId" that employeeService does not need. TODO: remove it and tranform the obj to the Employee class.
    const employeData = { ...createEmployeeDto, employer };
    return this.employeeService.create(employeData);
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
    const employeeData = { ...employeeToUpdate, ...employeeDto };

    return this.employeeService.findByIdAndUpdate(id, employeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id) {
    return this.employeeService.findByIdAndDelete(id);
  }
}
