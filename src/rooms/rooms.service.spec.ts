import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockAddUserToRoomDto,
  mockCreateRoomDto,
  mockSendMsgToRoomDto,
} from './dto/room.dto';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';
import { Message } from '../entities/msg.entity';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  const mockMessagesRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValueOnce([
        {
          id: '7d096d89-b923-4b42-a68e-01a778eecf16',
          content: 'mock-message',
        },
      ]),
    })),
    save: jest.fn().mockImplementation((msg) =>
      Promise.resolve({
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        ...msg,
      }),
    ),
  };

  const mockRoomsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    findOne: jest.fn().mockImplementation((room) =>
      Promise.resolve({
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        users: [],
        ...room,
      }),
    ),
    save: jest.fn().mockImplementation((room) =>
      Promise.resolve({
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        ...room,
      }),
    ),
  };

  const mockUsersRepository = {
    findOne: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        lastLogin: new Date('2023-04-21'),
        ...user,
      }),
    ),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        ...user,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessagesRepository,
        },
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  describe('rooms.service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('addUser()', () => {
    it('should return true', async () => {
      expect(await service.addUser(mockAddUserToRoomDto)).toEqual(true);
    });
  });

  describe('create()', () => {
    it('should create a new room', async () => {
      expect(await service.create(mockCreateRoomDto)).toEqual({
        name: mockCreateRoomDto.name,
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
      });
    });
  });

  describe('getLatesMsgs()', () => {
    it('should return an array of msgs', async () => {
      expect(
        service.getLatestMsgs(
          '7d096d89-b923-4b42-a68e-01a778eecf16',
          '470c5100-e087-4245-9ccc-2f719e7bc11e',
        ),
      ).resolves.toEqual([
        {
          id: '7d096d89-b923-4b42-a68e-01a778eecf16',
          content: 'mock-message',
        },
      ]);
    });
  });

  describe('sendMsg()', () => {
    it('should return true', async () => {
      expect(await service.sendMsg(mockSendMsgToRoomDto)).toEqual(true);
    });
  });
});
