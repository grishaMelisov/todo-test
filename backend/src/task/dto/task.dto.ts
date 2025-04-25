import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  title: string;

  completed: boolean;
  createdAt: Date;
}

export class TaskCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Value cannot be empty' })
  title: string;
}
