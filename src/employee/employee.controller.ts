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
    return await this.employeeService.createOrFail(employeeDto);
  }

  @Get()
  async findAllEmployees() {
    return await this.employeeService.findAllOrFail();
  }

  @Get(':id')
  async findEmployee(@Param() params) {
    return await this.employeeService.findByIdOrFail(params.id);
  }

  @Put(':id')
  async updateEmployee(
    @Param() params: any,
    @Body() employeeDto: Partial<EmployeeDto>,
  ) {
    return await this.employeeService.updateByIdOrFail(params.id, employeeDto);
  }

  @Delete(':id')
  async deleteEmployee(@Param() params) {
    return await this.employeeService.deleteByIdOrFail(params.id);
  }
}
