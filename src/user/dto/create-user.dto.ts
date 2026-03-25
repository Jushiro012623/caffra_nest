import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { IsConfirmed, IsUnique } from '@app/common/validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique({ tableName: 'users', column: 'email' })
  @ApiProperty({ description: 'User email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsUnique({ tableName: 'users', column: 'username' })
  @ApiProperty({ description: 'User username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(11)
  @IsUnique({ tableName: 'users', column: 'mobile_number' })
  @ApiProperty({ description: 'User mobile number' })
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: 'User password' })
  password: string;

  @IsConfirmed('password')
  @ApiProperty({ description: 'User password confirmation' })
  password_confirmation: string;
}
