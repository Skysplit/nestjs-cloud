import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsBoolean()
  completed!: boolean;
}
