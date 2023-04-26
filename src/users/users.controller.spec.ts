import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mockCreateUserDto } from './dto/users.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  const mockUsersService = {
    create: jest.fn((dto) => {
      return Promise.resolve({
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        ...dto,
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe('users.controller', () => {
    it('should be defined', () => {
      expect(usersController).toBeDefined();
    });
  });

  describe('create()', () => {
    it('should return a new user', () => {
      expect(usersController.create(mockCreateUserDto)).resolves.toEqual({
        name: mockCreateUserDto.name,
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
      });

      expect(mockUsersService.create).toHaveBeenCalledWith(mockCreateUserDto);
    });
  });
});
