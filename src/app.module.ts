import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { EmployerService } from './employer/employer.service';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [EmployeeModule, EmployerModule, TypeOrmModule.forRoot()],
  // * To make a service injectable to other services, make it available by providing them here and at the module they are used.
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
