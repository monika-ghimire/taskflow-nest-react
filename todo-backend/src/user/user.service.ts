import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password; 
    // user.role = Constants.ROLES.NORMAL_ROLE;
    user.role = createUserDto.role;


    return this.userRepo.save(user);
  }

  // Get all users
  
  findAll() {
    return this.userRepo.find();
  }

  // Find user by email
  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Find user by id
  async findUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Remove user
 async remove(id: number) {
  const user = await this.userRepo.findOne({ where: { id } });
  if (!user) throw new NotFoundException('User not found');

  user.isActive = false;
  return this.userRepo.save(user);
}

findAllActive() {
  return this.userRepo.find({
    where: { isActive: true }
  });
}


}
