import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'name: Minimum length is 5 characters' })
  @MaxLength(30, { message: 'name: Maximum length is 30 characters' })
  name: string;
}

// Create a mock MsgDto
export const mockUserDto = {
  id: '12345',
  name: 'mock user',
};