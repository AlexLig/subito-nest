import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from 'src/employee/employee.entity';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('varchar', { length: 9 })
  vat: string;

  @Column()
  ame?: string;

  @OneToMany(type => Employee, employee => employee.employer, {
    eager: true,
  })
  employees: Employee[];
}
