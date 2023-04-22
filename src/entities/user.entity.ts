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
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_user_id" })
  id: UUID;

  @Column()
  name: string;

  // @Column({foreignKeyConstraintName: "pk_room_id"})
  // room: UUID[];
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
