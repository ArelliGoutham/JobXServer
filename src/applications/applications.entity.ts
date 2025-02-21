import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicationStatusEnum } from './enums/application-status.enum';
import { User } from 'src/users/user.entity';

@Entity('job_applications') // Table name
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 48,
    nullable: false, // Unique job application ID
  })
  company: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 24,
    nullable: false,
  })
  location: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
    default: ApplicationStatusEnum.BOOKMARKED,
  })
  status: ApplicationStatusEnum;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  salary: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  jobPostingLink: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  skills: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  applicationSource: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', { nullable: true })
  notes?: string; // Optional notes field

  @Column('date', { nullable: false, default: new Date() })
  createdAt: Date; //

  @ManyToOne(() => User, (user) => user.jobApplications)
  user: User;
}
