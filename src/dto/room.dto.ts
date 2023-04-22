import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RoomDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'name: Minimum length is 5 characters' })
  @MaxLength(30, { message: 'name: Maximum length is 30 characters' })
  name: string;
}

// Create a mock MsgDto
export const mockRoomDto = {
  id: '45',
  name: 'mock room',
};