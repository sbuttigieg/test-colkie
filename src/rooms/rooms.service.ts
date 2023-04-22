import { Injectable } from '@nestjs/common';
import { MsgDto } from '../dto/msg.dto';
import { RoomDto } from '../dto/room.dto';

@Injectable()
export class RoomsService {
    addUser(id: string, userId: string): boolean {
        return true;
    }
    
    createRoom(room: RoomDto): string {
        var newRoom:RoomDto = {
            id: '45',
            name: room.name
        }

        return newRoom.id;
    }

    getLatestMsgs(id: string): MsgDto[] {
        return [{user:"123",msg:"any message"},{user:"456",msg:"another message"}]
    }

    sendMsg(id: string, msg: MsgDto): boolean {
        return true;
    }
}
