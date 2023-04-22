import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MsgDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Minimum length is 5 characters' })
  @MaxLength(30, { message: 'Maximum length is 30 characters' })
  user: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Minimum length is 1 characters' })
  @MaxLength(200, { message: 'Maximum length is 200 characters' })
  msg: string;
}

// Create a mock MsgDto
export const mockMsgDto = {
  user: '123',
  msg: 'any message',
};