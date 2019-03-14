import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerDto } from './employer.dto';

@Controller('/api/employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  // --- GET ---
  @Get()
  getAllEmployers() {
    // TODO: Get foreign key from User and if priviledged, return matching employers.
    return this.service.findAllOrFail();
  }

  /**
   * /employer:id?getRelatedEmployees = true | false
   * Get an employer by id. Query string to also get all related employees.
   */
  @Get(':id')
  getEmployer(
    @Param() params: any,
    @Query('getRelatedEmployees') getRelatedEmployes: boolean, // TODO: Sanitize query string!
  ) {
    return this.service.findByIdOrFail(params.id, getRelatedEmployes);
  }

  // --- CREATE ---
  @Post()
  createEmployer(@Body() employer: EmployerDto) {
    return this.service.createOrFail(employer);
  }

  // --- UPDATE ---
  @Put(':id')
  updateEmployer(@Param() params: any, @Body() employer: EmployerDto) {
    return this.service.updateOrFail(params.id, employer);
  }

  // --- DELETE ---
  @Delete(':id')
  deleteEmployer(@Param() params: any) {
    return this.service.delete(params.id);
  }
}
