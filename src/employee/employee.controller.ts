import { Controller, Get } from '@nestjs/common';
import { EmployeeService as EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getHello(): string {
    return this.employeeService.getHello();
  }
}
