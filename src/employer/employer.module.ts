import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Employer } from './employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerController } from './employer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class EmployerModule {}
