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
}

export class todoDtoDelete {
  @IsNumber()
  id: number;
}
