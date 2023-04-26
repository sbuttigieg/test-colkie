import { UUID } from 'crypto';
import {
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './msg.entity';
import { Room } from './room.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_user_id' })
  id: UUID;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @OneToMany(() => Message, (message: Message) => message.user)
  public messages: Message[];

  @ManyToMany(() => Room, (room: Room) => room.users)
  @JoinTable()
  public rooms: Room[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.messages) {
      this.messages = [];
    }

    if (!this.rooms) {
      this.rooms = [];
    }
  }
}
