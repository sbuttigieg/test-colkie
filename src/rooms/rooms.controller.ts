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
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async addUser(
    @Body(ValidationPipe) addUserToRoomDto: AddUserToRoomDto,
  ): Promise<boolean> {
    try {
      return await this.roomsService.addUser(addUserToRoomDto);
    } catch (error) {
      throw new HttpException(
        'Failed to add user to room',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // create room
  @Post()
  @ApiBody({ type: CreateRoomDto })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async create(
    @Body(ValidationPipe) createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    try {
      return await this.roomsService.create(createRoomDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create room',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // get latest messages from a room
  @Get('/:id/msg')
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  getLatestMsgs(
    @Param('id', ValidationPipe) id: UUID,
    @Query('user', ValidationPipe) user: UUID,
  ): Promise<Message[]> {
    return this.roomsService.getLatestMsgs(id, user);
  }

  // send msg to room
  @Post('msg')
  @ApiBody({ type: SendMsgToRoomDto })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  sendMsg(
    @Body(ValidationPipe) sendMsgToRoomDto: SendMsgToRoomDto,
  ): Promise<boolean> {
    return this.roomsService.sendMsg(sendMsgToRoomDto);
  }
}
