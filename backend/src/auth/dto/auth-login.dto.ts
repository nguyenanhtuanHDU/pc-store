import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @Expose()
  password: string;
}