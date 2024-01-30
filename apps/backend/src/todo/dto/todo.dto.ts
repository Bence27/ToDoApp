import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class todoDtoCreate {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  expireAt: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class todoDtoUpdate {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  expireAt: string;

  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class todoDtoDelete {
  @IsNumber()
  id: number;
}
