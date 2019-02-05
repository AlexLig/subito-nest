import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from 'src/employer/employer.entity';
import { EmployerService } from '../employer/employer.service';

@Module({
  // * To inject a service to another service with DI, make the class available at 'providers'
  // * and resolve its dependencies (in this case, the Typeorm Repository).
  imports: [TypeOrmModule.forFeature([Employee, Employer])],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployerService],
})
export class EmployeeModule {}
