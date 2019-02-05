import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employer } from 'src/employer/employer.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ width: 9 })
  vat: string;

  @Column('time')
  startWork: string;

  @Column('time')
  endWork: string;

  @ManyToOne(type => Employer, employer => employer.employees)
  employer: Employer;
}
