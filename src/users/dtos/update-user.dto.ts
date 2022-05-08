import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdaterUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
