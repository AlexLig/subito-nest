import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './createEmployer.dto';
import { identity } from 'rxjs';

@Controller('employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  @Get()
  getAllEmployers() {
    return this.service.findAll();
  }

  @Get(':id')
  getEmployer(@Param() id) {
    return this.service.findOne(id);
  }

  @Post()
  createEmployer(@Body() employer: CreateEmployerDto) {
    return this.service.create(employer);
  }

  @Put(':id')
  updateEmployer(@Param() id, @Body() employer: CreateEmployerDto) {
    return this.service.update(id, employer);
  }
}
