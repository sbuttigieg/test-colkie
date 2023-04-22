import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
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

// Create a mock MsgDto
export const mockRoomDto: RoomDto = {
  name: 'mock room',
};
