import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'identifiant'})
  uid: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'pseudo'})
  username: string;

  @Column({ select: false })
  @ApiProperty({ description: 'mot de passe (hashé)'})
  password: string;
}
