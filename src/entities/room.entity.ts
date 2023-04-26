import { UUID } from 'crypto';
import {
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './msg.entity';
import { User } from './user.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'pk_room_id' })
  id: UUID;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Message, (message: Message) => message.room)
  public messages: Message[];

  @ManyToMany(() => User, (user: User) => user.rooms)
  public users: User[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.messages) {
      this.messages = [];
    }

    if (!this.users) {
      this.users = [];
    }
  }
}
