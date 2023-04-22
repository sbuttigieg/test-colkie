import {
  Controller,
  Patch,
  Post,
  Param,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { MsgDto } from '../dto/msg.dto';
import { RoomDto } from '../dto/room.dto';
import { RoomsLatestMsgsResult } from './interfaces/rooms-latest-msgs-result.interface';
import { UUID } from 'crypto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Patch(':id/user/:userid')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  addUser(
    @Param('id', ValidationPipe) id: UUID,
    @Param('userid', ValidationPipe) userId: UUID,
  ): boolean {
    return this.roomsService.addUser(id, userId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  createRoom(@Body(ValidationPipe) roomDto: RoomDto): string {
    return this.roomsService.createRoom(roomDto);
  }

  @Get('/:id/msg')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  getLatestMsgs(
    @Param('id', ValidationPipe) id: UUID,
  ): RoomsLatestMsgsResult[] {
    return this.roomsService.getLatestMsgs(id);
  }

  @Post('/msg')
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  sendMsg(@Body(ValidationPipe) msgDto: MsgDto): boolean {
    return this.roomsService.sendMsg(msgDto);
  }
}
