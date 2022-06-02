import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { UserDto } from '../../user/dto/user/user.dto';
import { LocalAuthenticationGuard } from '../guards/localAuthentication.guard';

export interface RequestWithUser extends Request {
  user: UserDto;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() userData: UserDto): Promise<UserDto> {
    return this.authService.register(userData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() request: RequestWithUser): Promise<UserDto> {
    return request.user;
  }
}
