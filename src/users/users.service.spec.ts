import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mockUserDto } from '../dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return the new user id"', () => {
      expect(service.createUser(mockUserDto)).toBe(
        '470c5100-e087-4245-9ccc-2f719e7bc11e',
      );
    });
  });
});
