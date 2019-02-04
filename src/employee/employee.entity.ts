import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employer } from 'src/employer/employer.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 9 })
  vat: string;

  @ManyToOne(type => Employer, employer => employer.employees)
  employer: Employer;
}
