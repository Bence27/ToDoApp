import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDtoSignUp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class AuthDtoLogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthDtoForAdmin {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
