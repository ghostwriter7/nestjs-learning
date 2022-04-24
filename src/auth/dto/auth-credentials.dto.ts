import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  public username: string;
  @IsNotEmpty()
  public password: string;
}

