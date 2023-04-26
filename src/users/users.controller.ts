import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CreateUserDto } from './dto/users.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // create user
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to create user';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }

  // get user by id
  @Get('/:id')
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiOperation({ summary: 'Get user by id' })
  async getOne(@Param('id', ValidationPipe) id: UUID): Promise<User> {
    return await this.usersService.getOne(id).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to get user by id';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }
}
