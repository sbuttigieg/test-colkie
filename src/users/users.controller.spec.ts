import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { mockUserDto } from '../dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('should return new user id"', () => {
      expect(controller.createUser(mockUserDto)).toBe('470c5100-e087-4245-9ccc-2f719e7bc11e');
    });
  });
});
