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
      expect(service.addUser('7d096d89-b923-4b42-a68e-01a778eecf16', '470c5100-e087-4245-9ccc-2f719e7bc11e')).toBe(true);
    });
    
    it('should return new room id', () => {
      expect(service.createRoom(mockRoomDto)).toBe('7d096d89-b923-4b42-a68e-01a778eecf16');
    });

    it('should return an array of msgs', () => {
      expect(service.getLatestMsgs('7d096d89-b923-4b42-a68e-01a778eecf16')).toStrictEqual([{user:"470c5100-e087-4245-9ccc-2f719e7bc11e",content:"any message"}]);
    });

    it('should return true', () => {
      expect(service.sendMsg(mockMsgDto)).toBe(true);
    });
  });
});
