import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MsgDto, mockMsgDto } from '../dto/msg.dto';
import { mockRoomDto } from '../dto/room.dto';

describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return true', () => {
      expect(controller.addUser('45', '123')).toBe(true);
    });

    it('should return new room id', () => {
      expect(controller.createRoom(mockRoomDto)).toBe('45');
    });

    it('should return an array of msgs', () => {
      expect(controller.getLatestMsgs('45'))
        .toStrictEqual([{user:"123",msg:"any message"},{user:"456",msg:"another message"}]);
    });

    it('should return true', () => {
      expect(controller.sendMsg('45', mockMsgDto))
        .toBe(true);
    });
  });
});
