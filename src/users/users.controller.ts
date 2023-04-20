import { Controller, Post, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post()
    createUser(
        @Body(ValidationPipe) userDto: UserDto,
    ): string {
      return this.usersService.createUser(userDto);
    }
}
