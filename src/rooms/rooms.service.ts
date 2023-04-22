import { Injectable } from '@nestjs/common';
import { MsgDto } from '../dto/msg.dto';
import { RoomDto } from '../dto/room.dto';
import { RoomsLatestMsgsResult } from './interfaces/rooms-latest-msgs-result.interface';

@Injectable()
export class RoomsService {
    addUser(id: string, userId: string): boolean {
        return true;
    }
    
    createRoom(room: RoomDto): string {
        var newRoom:RoomDto = {
            name: room.name
        }

        return '7d096d89-b923-4b42-a68e-01a778eecf16';
    }

    getLatestMsgs(id: string): RoomsLatestMsgsResult[] {
        return [{user:"470c5100-e087-4245-9ccc-2f719e7bc11e", content:"any message"}]// ,{user:"456",msg:"another message"}]
    }

    sendMsg(msg: MsgDto): boolean {
        return true;
    }
}
