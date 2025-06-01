import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;
    events: any;
  

    
}