import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.signUp(authCredentialsDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this._userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
