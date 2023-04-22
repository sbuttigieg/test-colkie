import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [UsersModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
