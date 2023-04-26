import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import {
  AddUserToRoomDto,
  CreateRoomDto,
  SendMsgToRoomDto,
} from './dto/room.dto';
import { Message } from '../entities/msg.entity';
import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // add user to room
  async addUser(addUserToRoomDto: AddUserToRoomDto): Promise<boolean> {
    try {
      const room = await this.roomsRepository.findOneOrFail({
        where: { id: addUserToRoomDto.room },
      });
      if (!room) {
        throw new HttpException(
          'Room with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      const user = await this.usersRepository.findOneOrFail({
        where: { id: addUserToRoomDto.user },
      });
      if (!user) {
        throw new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }

      room.users.push(user);
      this.roomsRepository.save(room);

      return true;
    } catch (error) {
      throw error;
    }
  }

  // create room
  create(createRoomDto: CreateRoomDto) {
    const newRoom = this.roomsRepository.create(createRoomDto);

    return this.roomsRepository.save(newRoom);
  }

  // get latest messages from a room
  async getLatestMsgs(id: UUID, userId: UUID): Promise<Message[]> {
    const msgRoom = await this.roomsRepository.findOneOrFail({
      where: { id: id },
    });
    if (!msgRoom) {
      throw new HttpException(
        'Room with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const msgUser = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    if (!msgUser) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const timeNow = new Date(Date.now());

    const msgs = await this.messagesRepository
      .createQueryBuilder('msg')
      .where(`msg."createdAt" > :date`, { date: msgUser.lastLogin })
      .andWhere('msg.room = :room', { room: msgRoom.id })
      .getMany();

    msgUser.lastLogin = timeNow;
    this.usersRepository.save(msgUser);

    return msgs;
  }

  // send msg to room
  async sendMsg(sendMsgToRoomDto: SendMsgToRoomDto): Promise<boolean> {
    const room = await this.roomsRepository.findOneOrFail({
      where: { id: sendMsgToRoomDto.room },
    });
    if (!room) {
      throw new HttpException(
        'Room with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.usersRepository.findOneOrFail({
      where: { id: sendMsgToRoomDto.user },
    });
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const newMsg = this.messagesRepository.create({
      content: sendMsgToRoomDto.content,
      room: room,
      user: user,
    });

    this.messagesRepository.save(newMsg);
    return true;
  }
}
