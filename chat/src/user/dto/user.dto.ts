import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'pseudo (unique)' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'mot de passe' })
  password: string;
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}