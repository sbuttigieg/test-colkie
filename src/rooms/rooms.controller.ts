import {
  Controller,
  Patch,
  Post,
  Param,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MsgDto } from '../dto/msg.dto';
import { RoomDto } from '../dto/room.dto';
import { RoomsLatestMsgsResult } from './interfaces/rooms-latest-msgs-result.interface';
import { UUID } from 'crypto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Patch(':id/user/:userid')
  addUser(
    @Param('id', ValidationPipe) id: UUID,
    @Param('userid', ValidationPipe) userId: UUID,
  ): boolean {
    return this.roomsService.addUser(id, userId);
  }

  @Post()
  createRoom(@Body(ValidationPipe) roomDto: RoomDto): string {
    return this.roomsService.createRoom(roomDto);
  }

  @Get('/:id/msg')
  getLatestMsgs(
    @Param('id', ValidationPipe) id: UUID,
  ): RoomsLatestMsgsResult[] {
    return this.roomsService.getLatestMsgs(id);
  }

  @Post('/msg')
  sendMsg(@Body(ValidationPipe) msgDto: MsgDto): boolean {
    return this.roomsService.sendMsg(msgDto);
  }
}
