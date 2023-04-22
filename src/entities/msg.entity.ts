import { UUID } from 'crypto';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_msg_id" })
  id: UUID;

  @Column({ foreignKeyConstraintName: "pk_room_id" })
  room: UUID;
  
  @Column({ foreignKeyConstraintName: "pk_user_id" })
  user: UUID;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
