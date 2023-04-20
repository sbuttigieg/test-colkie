import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
    createUser(user: UserDto): string {
        var newUser:UserDto = {
            id: '12345',
            name: user.name
        }
        return newUser.id;
    }
}
