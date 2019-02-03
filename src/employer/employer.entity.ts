import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
