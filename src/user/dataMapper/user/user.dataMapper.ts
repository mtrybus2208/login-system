import { User } from '../../entities/user.entity';
import { UserDto } from '../../dto/user/user.dto';

export class UserDataMapper {
  public static toEntity(userDto: UserDto): User {
    if (!userDto) return null;

    const newUser = new User();

    newUser.email = userDto.email;
    newUser.gender = userDto.gender;
    newUser.username = userDto.username;
    newUser.password = userDto.password;

    return newUser;
  }
}
