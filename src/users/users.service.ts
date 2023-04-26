import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  getOne(id: UUID) {
    try {
      const user = this.usersRepository.findOne({
        where: {
          id,
        },
        relations: ['rooms'],
        select: ['id', 'name'],
      });
      if (!user) {
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
