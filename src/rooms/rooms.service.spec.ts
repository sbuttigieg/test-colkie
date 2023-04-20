import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { MsgDto, mockMsgDto } from '../dto/msg.dto';
import { mockRoomDto } from '../dto/room.dto';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    
    it('should return true', () => {
      expect(service.addUser('45', '123')).toBe(true);
    });
    
    it('should return new room id', () => {
      expect(service.createRoom(mockRoomDto)).toBe('45');
    });

    it('should return an array of msgs', () => {
      expect(service.getLatestMsgs('45')).toStrictEqual([{user:"123",msg:"any message"},{user:"456",msg:"another message"}]);
    });

    it('should return true', () => {
      expect(service.sendMsg('45', mockMsgDto)).toBe(true);
    });
  });
});
