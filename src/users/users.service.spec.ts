import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { mockCreateUserDto } from './dto/users.dto';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('users.service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      expect(await service.create(mockCreateUserDto)).toEqual({
        name: mockCreateUserDto.name,
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
      });
    });
  });
});
