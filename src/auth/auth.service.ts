import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository) {}

  public singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.signUp(authCredentialsDto);
  }
}
