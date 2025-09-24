import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UserRepository } from './repo/user.repository';
import {User} from './entities/user.entity'
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {

 constructor(private readonly userRepository: UserRepository) {}

 create(createUserDto: CreateUserDto) {
  let user : User = new User();
  user.email = createUserDto.email
  user.firstName = createUserDto.firstName
  user.lastName = createUserDto.lastName
  user.password = createUserDto.password
  user.role = Constants.ROLES.NORMAL_ROLE

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

async findUserByEmail(email: string) {
  const user = await this.userRepository.findOneByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}


 async remove(id: number) {
  const user = await this.userRepository.findOne(id);
  if (!user) {
    throw new Error('User not found');
  }
  await this.userRepository.remove(id);
  return { message: 'User removed successfully' };
}

}
