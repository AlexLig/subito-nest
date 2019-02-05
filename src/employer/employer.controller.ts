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

@Controller('/api/employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  // GET
  @Get()
  getAllEmployers() {
    // TODO: Get foreign key from User and if priviledged, return matching employers.
    return this.service.findAll();
  }

  @Get(':id')
  getEmployer(@Param('id') id: string) {
    return this.service.findById(id);
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
