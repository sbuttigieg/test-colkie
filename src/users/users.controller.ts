import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({ type: UserDto })
  createUser(@Body(ValidationPipe) userDto: UserDto): string {
    return this.usersService.createUser(userDto);
  }
}
