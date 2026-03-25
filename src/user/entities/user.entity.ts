import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity({name: 'users'})
export class User {
    @ApiProperty({description: 'User id'})
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty({description: 'User username'})
    @Column({type: 'varchar', nullable: false, unique: true})
    username: string;

    @ApiProperty({description: 'User password'})
    @Column({type: 'varchar', nullable: false})
    password: string;

    @ApiProperty({description: 'User email'})
    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @ApiProperty({description: 'User mobile number'})
    @Column({type: 'varchar', nullable: false, unique: true})
    mobile_number: string;

    @ApiProperty({description: 'User created at'})
    @Column({type: 'timestamp', nullable: false})
    created_at: Date;

    @ApiProperty({description: 'User updated at'})
    @Column({type: 'timestamp', nullable: false})
    updated_at: Date;

    @ApiProperty({description: 'User deleted at'})
    @Column({type: 'timestamp', nullable: true})
    deleted_at?: Date;
}
