import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);

      return this.usersRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  // getAll() {
  //   return this.usersRepository.find({
  //     relations: ['rooms', ' messages'],
  //     select: ['id', 'name'],
  //   });
  // }

  getOne(id: UUID) {
    try {
      const user = this.usersRepository.findOneOrFail({
        where: {
          id,
        },
        relations: ['rooms'],
        select: ['id', 'name'],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
