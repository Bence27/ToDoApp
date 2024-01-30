import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserDtoDelete, UserDtoUpdate } from './dto';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Put('meupdate')
  updateMe(@Body() userDtoUpdate: UserDtoUpdate) {
    return this.userService.updateUser(userDtoUpdate);
  }

  @Delete('medelete')
  deleteMe(@Body() userDtoDelete: UserDtoDelete) {
    this.userService.deleteUser(userDtoDelete);
  }
}
