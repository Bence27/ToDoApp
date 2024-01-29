import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismamoduleService } from 'src/prismamodule/prismamodule.service';
import { UserDtoDelete, UserDtoUpdate } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismamoduleService) {}

  async updateUser(userDtoUpdate: UserDtoUpdate) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: userDtoUpdate.id },
    });

    if (!existingUser) {
      throw new ForbiddenException(
        `User with ID ${userDtoUpdate.id} not found`,
      );
    }
    const updatedUser = await this.prismaService.user.update({
      where: { id: userDtoUpdate.id },
      data: {
        email: userDtoUpdate.email,
        username: userDtoUpdate.username,
        image: userDtoUpdate.image,
      },
    });

    return { updatedUser };
  }

  async deleteUser(userDtoDelete: UserDtoDelete) {
    await this.prismaService.user.delete({
      where: { id: userDtoDelete.id },
    });
  }
}
