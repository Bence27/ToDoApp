import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDtoUpdate {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  id: number;

  @IsString()
  image: string;
}

export class UserDtoDelete {
  @IsNumber()
  id: number;
}
