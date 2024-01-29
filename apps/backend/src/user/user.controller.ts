import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserDtoDelete, UserDtoUpdate } from './dto';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Put('meupdate')
  updateMe(@Body() userDtoUpdate: UserDtoUpdate) {
    return this.userService.updateUser(userDtoUpdate);
  }

  @UseGuards(JwtGuard)
  @Delete('medelete')
  deleteMe(@Body() userDtoDelete: UserDtoDelete) {
    this.userService.deleteUser(userDtoDelete);
  }
}
