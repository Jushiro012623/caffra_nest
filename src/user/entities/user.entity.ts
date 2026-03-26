import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@app/role/entities/role.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'User id' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ description: 'User username' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @ApiProperty({ description: 'User password' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({ description: 'User email' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'User mobile number' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  mobile_number: string;

  @ApiProperty({ description: 'User created at' })
  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @ApiProperty({ description: 'User updated at' })
  @Column({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @ApiProperty({ description: 'User deleted at' })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToMany((): typeof Role => Role, (role: Role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
