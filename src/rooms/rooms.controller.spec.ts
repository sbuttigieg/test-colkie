import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import {
  mockAddUserToRoomDto,
  mockCreateRoomDto,
  mockSendMsgToRoomDto,
} from './dto/room.dto';

describe('RoomsController', () => {
  let roomsController: RoomsController;
  const mockRoomsService = {
    addUser: jest.fn(() => {
      return Promise.resolve(true);
    }),
    create: jest.fn((dto) => {
      return Promise.resolve({
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        ...dto,
      });
    }),
    getLatestMsgs: jest.fn(() => {
      return Promise.resolve([
        {
          content: 'any message',
          user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        },
      ]);
    }),
    sendMsg: jest.fn(() => {
      return Promise.resolve(true);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService],
    })
      .overrideProvider(RoomsService)
      .useValue(mockRoomsService)
      .compile();

    roomsController = module.get<RoomsController>(RoomsController);
  });

  describe('rooms.controller', () => {
    it('should be defined', () => {
      expect(roomsController).toBeDefined();
    });

    describe('addUser()', () => {
      it('should return true', () => {
        expect(roomsController.addUser(mockAddUserToRoomDto)).resolves.toEqual(
          true,
        );

        expect(mockRoomsService.addUser).toHaveBeenCalledWith(
          mockAddUserToRoomDto,
        );
      });
    });

    describe('create()', () => {
      it('should return a new room', () => {
        expect(roomsController.create(mockCreateRoomDto)).resolves.toEqual({
          name: mockCreateRoomDto.name,
          id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        });

        expect(mockRoomsService.create).toHaveBeenCalledWith(mockCreateRoomDto);
      });
    });

    describe('getLatestMsgs()', () => {
      it('should return an array of msgs', async () => {
        expect(
          roomsController.getLatestMsgs(
            '7d096d89-b923-4b42-a68e-01a778eecf16',
            '470c5100-e087-4245-9ccc-2f719e7bc11e',
          ),
        ).resolves.toStrictEqual([
          {
            user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
            content: 'any message',
          },
        ]);
      });
    });

    describe('sendMsg()', () => {
      it('should return true', () => {
        expect(roomsController.sendMsg(mockSendMsgToRoomDto)).resolves.toEqual(
          true,
        );

        expect(mockRoomsService.sendMsg).toHaveBeenCalledWith(
          mockSendMsgToRoomDto,
        );
      });
    });
  });
});
