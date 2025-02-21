import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRoles } from './enums/userRoles.enum';
import { JobApplication } from 'src/applications/applications.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 320,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 24,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false,
  })
  password: string;

  @OneToMany(() => JobApplication, (application) => application.user, {
    cascade: ['remove'],
  })
  jobApplications: JobApplication[];
}
