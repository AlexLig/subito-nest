import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployerService {
  getEmployers(): string {
    throw new Error('Method not implemented.');
  }
}
