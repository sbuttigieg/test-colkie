import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        retryDelay: 5000,
        type: 'postgres',
        host: configService.get('POSTGRES_DB_HOST'),
        port: +configService.get<number>('POSTGRES_DB_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB_NAME'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true, // comment for production
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
