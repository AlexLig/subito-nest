import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/createEmployer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  // GET
  @Get()
  getAllEmployers() {
    return this.service.findAll();
  }

  @Get(':id')
  getEmployer(@Param('id') id) {
    return this.service.findOne(id);
  }

  // POST
  @Post()
  createEmployer(@Body() employer: CreateEmployerDto) {
    return this.service.create(employer);
  }

  // PUT
  @Put(':id')
  updateEmployer(@Param('id') id, @Body() employer: CreateEmployerDto) {
    return this.service.update(id, employer);
  }

  // DELETE
  @Delete(':id')
  deleteEmployer(@Param('id') id) {
    return this.service.delete(id);
  }
}
