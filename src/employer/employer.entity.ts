import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from 'src/employee/employee.entity';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // unique = true ?
  @Column('varchar', { length: 9})
  vat: string;

  @Column('varchar', { length: 10, nullable: true })
  ame?: string;

  @OneToMany(type => Employee, employee => employee.employer)
  employees: Employee[];
}
