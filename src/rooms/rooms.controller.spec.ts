import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { mockMsgDto } from '../dto/msg.dto';
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
      expect(
        controller.addUser(
          '7d096d89-b923-4b42-a68e-01a778eecf16',
          '470c5100-e087-4245-9ccc-2f719e7bc11e',
        ),
      ).toBe(true);
    });

    it('should return new room id', () => {
      expect(controller.createRoom(mockRoomDto)).toBe(
        '7d096d89-b923-4b42-a68e-01a778eecf16',
      );
    });

    it('should return an array of msgs', () => {
      expect(
        controller.getLatestMsgs('7d096d89-b923-4b42-a68e-01a778eecf16'),
      ).toStrictEqual([
        {
          user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
          content: 'any message',
        },
      ]);
    });

    it('should return true', () => {
      expect(controller.sendMsg(mockMsgDto)).toBe(true);
    });
  });
});
