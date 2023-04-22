import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  createUser(user: UserDto): string {
    const newUser: UserDto = {
      name: user.name,
    };
    return '470c5100-e087-4245-9ccc-2f719e7bc11e';
  }
}
