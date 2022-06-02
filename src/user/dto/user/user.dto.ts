import {
  IsNotEmpty,
  MaxLength,
  IsDefined,
  MinLength,
  IsEnum,
} from 'class-validator';

import { Gender } from '../../../shared/types';

export enum UserMessage {
  INVALID_USER_REQUIRED = 'This field is required',
  INVALID_PASSWORD_REQUIRED = 'User password is required',
  INVALID_USER_EMAIL_MIN = 'User email must be minimum 5 characters long',
  INVALID_USERNAME_MIN = 'User name must be minimum 5 characters long',
  INVALID_USER_EMAIL_MAX = 'User email must be maximum  100 characters long',
  INVALID_USERNAME_MAX = 'User name must be maximum  100 characters long',
  INVALID_USER_AGE_TYPE = 'You must specify a number',
  INVALID_USER_AGE_REQUIRED = 'User age is required',
}

export class UserDto {
  @MinLength(5, {
    message: UserMessage.INVALID_USER_EMAIL_MIN,
  })
  @MaxLength(100, {
    message: UserMessage.INVALID_USER_EMAIL_MAX,
  })
  @IsNotEmpty({
    message: UserMessage.INVALID_USER_REQUIRED,
  })
  @IsDefined()
  email: string;

  @IsEnum(Gender, { each: true })
  gender: Gender;

  @MinLength(5, {
    message: UserMessage.INVALID_USERNAME_MIN,
  })
  @MaxLength(50, {
    message: UserMessage.INVALID_USERNAME_MAX,
  })
  @IsNotEmpty({
    message: UserMessage.INVALID_USER_REQUIRED,
  })
  @IsDefined()
  username: string;

  @IsNotEmpty({
    message: UserMessage.INVALID_PASSWORD_REQUIRED,
  })
  password: string;
}
