import { Controller, Patch, Post, Param, Body, ParseIntPipe, ValidationPipe, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MsgDto } from '../dto/msg.dto';
import { RoomDto } from '../dto/room.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Patch(':id/user/:userid')
    addUser(
      @Param('id', ParseIntPipe) id: string,
      @Param('userid', ParseIntPipe) userId: string,
    ): boolean {
      return this.roomsService.addUser(id, userId);
    }
    
    @Post()
    createRoom(
        @Body(ValidationPipe) roomDto: RoomDto,
    ): string {
      return this.roomsService.createRoom(roomDto);
    }

    @Get('/:id/msg')
    getLatestMsgs(
      @Param('id', ParseIntPipe) id: string,
    ): MsgDto[] {
      return this.roomsService.getLatestMsgs(id);
    }

    @Post('/:id/msg')
    sendMsg(
      @Param('id', ParseIntPipe) id: string,
      @Body(ValidationPipe) msgDto: MsgDto,
    ): boolean {
      return this.roomsService.sendMsg(id, msgDto);
    }
}
