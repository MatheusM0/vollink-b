import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  serviceType: string;

  @Column()
  date: string;
}
