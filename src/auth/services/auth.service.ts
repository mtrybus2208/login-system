import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import bcryptjs = require('bcryptjs');

import { User } from '../../user/entities/user.entity';
import { UserDto } from '../../user/dto/user/user.dto';
import { UserService } from '../../user/services/user.service';

export enum PostgresErrorCode {
  UniqueViolation = '23505',
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async register(userData: UserDto): Promise<User> {
    const hashedPassword = await bcryptjs.hash(userData.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User | null> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatching = await this.verifyPassword(
      plainTextPassword,
      user.password,
    );

    return isPasswordMatching ? user : null;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(plainTextPassword, hashedPassword);
  }
}
