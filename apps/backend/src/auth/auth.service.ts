import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismamoduleService } from 'src/prismamodule/prismamodule.service';
import { AuthDtoLogin, AuthDtoSignUp } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismamoduleService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDtoSignUp) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          username: dto.username,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('The e-mail address is taken!');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDtoLogin) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Email is incorrect!');
    }

    if (!user.hash) {
      throw new ForbiddenException('User password hash is missing!');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Password is incorrect!');
    }

    delete user.hash;
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string; id: number }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret: secret,
    });

    return {
      access_token: token,
      id: userId,
    };
  }
}
