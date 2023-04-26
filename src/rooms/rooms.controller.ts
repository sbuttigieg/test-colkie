import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import {
  AddUserToRoomDto,
  CreateRoomDto,
  SendMsgToRoomDto,
} from './dto/room.dto';
import { Message } from '../entities/msg.entity';
import { Room } from '../entities/room.entity';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  // add user to room
  @Post('user')
  @ApiBody({ type: AddUserToRoomDto })
  @ApiCreatedResponse({ description: 'Added Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOperation({ summary: 'Add a user to a room' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async addUser(
    @Body(ValidationPipe) addUserToRoomDto: AddUserToRoomDto,
  ): Promise<boolean> {
    return await this.roomsService.addUser(addUserToRoomDto).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to add user to room';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }

  // create room
  @Post()
  @ApiBody({ type: CreateRoomDto })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOperation({ summary: 'Create a new room' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async create(
    @Body(ValidationPipe) createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    return await this.roomsService.create(createRoomDto).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to create room';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }

  // get latest messages from a room
  @Get('/:id/msg')
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiOperation({ summary: 'Get latest messages from a room' })
  async getLatestMsgs(
    @Param('id', ValidationPipe) id: UUID,
    @Query('user', ValidationPipe) user: UUID,
  ): Promise<Message[]> {
    return await this.roomsService.getLatestMsgs(id, user).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to get latest messages';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }

  // send msg to room
  @Post('msg')
  @ApiBody({ type: SendMsgToRoomDto })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOperation({ summary: 'Send msg to room' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async sendMsg(
    @Body(ValidationPipe) sendMsgToRoomDto: SendMsgToRoomDto,
  ): Promise<boolean> {
    return await this.roomsService.sendMsg(sendMsgToRoomDto).catch((err) => {
      if (!err.status) {
        err.message = 'Failed to send message';
        err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      throw new HttpException(err.message, err.status);
    });
  }
}
