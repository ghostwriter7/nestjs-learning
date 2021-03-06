import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ISignInResponse } from './interfaces/sign-in-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/signup')
  public signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<ISignInResponse> {
    return this._authService.signIn(authCredentialsDto);
  }
}
