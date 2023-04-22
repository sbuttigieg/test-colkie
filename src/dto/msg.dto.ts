import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class MsgDto {
  @IsNotEmpty()
  @IsUUID()
  room: UUID

  @IsNotEmpty()
  @IsUUID()
  user: UUID;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Minimum length is 1 characters' })
  @MaxLength(200, { message: 'Maximum length is 200 characters' })
  content: string;
}

// Create a mock MsgDto
export const mockMsgDto:MsgDto = {
  room: '7d096d89-b923-4b42-a68e-01a778eecf16',
  user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
  content: 'any message',
};