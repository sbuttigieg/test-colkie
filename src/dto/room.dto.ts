import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class RoomDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'name: Minimum length is 5 characters' })
  @MaxLength(30, { message: 'name: Maximum length is 30 characters' })
  name: string;
}

// Create a mock MsgDto
export const mockRoomDto:RoomDto = {
  name: 'mock room',
};