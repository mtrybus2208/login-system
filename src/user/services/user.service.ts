import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserDto } from '../../user/dto/user/user.dto';
import { UserDataMapper } from '../dataMapper/user/user.dataMapper';

export interface IUserService {
  getAll(user: User): Promise<User[]>;
  create(user: UserDto): Promise<User>;
  getByEmail(email: string): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(userDto: UserDto): Promise<User> {
    const user: User = UserDataMapper.toEntity(userDto);

    return this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
