import { UUID } from 'crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_msg_id' })
  id: UUID;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Room, (room: Room) => room.messages)
  public room: Room;

  @ManyToOne(() => User, (user: User) => user.messages)
  public user: User;
}
