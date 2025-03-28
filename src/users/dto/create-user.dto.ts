import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty() // Ensures name is not empty
  name: string;

  @IsEmail() // Ensures valid email format
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(15)
  @IsNotEmpty() // Ensures mobile is not empty
  mobile: string;

  @IsString()
  @IsNotEmpty() // Ensures password is not empty
  password: string;
}
