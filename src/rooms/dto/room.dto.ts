import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class AddUserToRoomDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property. Cannot be Empty.  Type UUIDv4',
  })
  @IsNotEmpty()
  @IsUUID()
  room: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a required property. Cannot be Empty.  Type UUIDv4',
  })
  @IsNotEmpty()
  @IsUUID()
  user: UUID;
}

// Create a mock AddUserToRoomDto
export const mockAddUserToRoomDto: AddUserToRoomDto = {
  room: '7d096d89-b923-4b42-a68e-01a778eecf16',
  user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
};

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    description:
      'This is a required property. Cannot be Empty.  Minimum length is 5 characters. Maximum length is 30 characters.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'name: Minimum length is 5 characters' })
  @MaxLength(30, { message: 'name: Maximum length is 30 characters' })
  name: string;
}

// Create a CreateRoomDto
export const mockCreateRoomDto: CreateRoomDto = {
  name: 'mock room',
};

export class SendMsgToRoomDto {
  @ApiProperty({
    type: String,
    description:
      'This is a required property. Cannot be Empty.  Minimum length is 1 characters. Maximum length is 200 characters.',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Minimum length is 1 characters' })
  @MaxLength(200, { message: 'Maximum length is 200 characters' })
  content: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property. Must be UUID. Cannot be Empty.',
  })
  @IsNotEmpty()
  @IsUUID()
  room: UUID;

  @ApiProperty({
    type: String,
    description: 'This is a required property. Must be UUID. Cannot be Empty.',
  })
  @IsNotEmpty()
  @IsUUID()
  user: UUID;
}

// Create a mock SendMsgToRoomDto
export const mockSendMsgToRoomDto: SendMsgToRoomDto = {
  content: 'any message',
  room: '7d096d89-b923-4b42-a68e-01a778eecf16',
  user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
};
