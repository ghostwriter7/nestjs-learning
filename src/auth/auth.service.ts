import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ISignInResponse } from './interfaces/sign-in-response.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private _userRepository: UserRepository,
    private _jwtService: JwtService
   ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.signUp(authCredentialsDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<ISignInResponse> {
    const username = await this._userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = { username };
    const accessToken = this._jwtService.sign(payload);

    return { accessToken };
  }
}
