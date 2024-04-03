import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(signInDto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: signInDto.username },
    });
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException('Unauthorized');
    }

    return jwt.sign(
      {
        username: user.username,
        sub: user.uid,
      },
      process.env.JWT_SECRET,
    );
  }

  async signUp(signUpDto: AuthDto): Promise<User> {
    const existingUsername = await this.userRepository.exists({
      where: {
        username: signUpDto.username,
      },
    });

    if (existingUsername) {
      throw new ConflictException('Ce pseudo a déjà été utilisé');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const user = await this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async getUserFromRequest(req): Promise<User> {
    try {
      if (!req.headers.authorization) {
        throw new NotFoundException(`request not found`);
      }

      const authorization = req.headers.authorization.replaceAll('Bearer ', '');
      const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

      const user = await this.userRepository.findOne({
        where: {
          uid: decoded.sub,
        },
      });

      if (!user) {
        throw new NotFoundException(`User #${decoded.sub} not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message,
        '500 Internal Server Error',
      );
    }
  }
}
