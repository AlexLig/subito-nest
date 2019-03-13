import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDto } from './employee.dto';
import {
  employeeErrors,
} from 'src/shared';
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  // * POST
  async create(employeeDto: EmployeeDto): Promise<Employee> {
    // Get employer
    // const employer = await this.employerService.findOne(employeeDto.employerId);
    // Combine dto with employer
    const employeeToCreate = { ...employeeDto, employer };
    // save to db
    return await this.repository.save(employeeToCreate);
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    return await this.repository.find();
  }

  async findByIdOrFail(id: string): Promise<Employee> {
    const employee = await this.repository.findOne(id);
    if (!employee)
      throw new HttpException(employeeErrors.NOT_FOUND, HttpStatus.NOT_FOUND);

    return employee;
  }

  // * PUT
  async updateByIdOrFail(id: string, employeeDto: Partial<EmployeeDto>) {
    const employeeToUpdate = await this.findByIdOrFail(id);
    const updated: Employee = { ...employeeToUpdate, ...employeeDto };

    // const { employerId, vat } = employeeDto;
    // if (vat) {
    //   const duplicate = await this.repository.findOne({ vat });
    //   if (duplicate && duplicate.id.toString() !== id) {
    //     throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
    //   }
    // }
    // if (employerId) {
    //   // const employer: Employer = await this.employerService.findById(empId);
    //   // updated = { ...updated, employer };
    // }

    return await this.repository.save(updated);
  }

  // * DELETE
  async deleteByIdOrFail(id: string): Promise<Employee> {
    const employeeToDelete = await this.findByIdOrFail(id);
    if (!employeeToDelete)
      throw new HttpException(employeeErrors.NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.repository.remove(employeeToDelete);
  }
}
