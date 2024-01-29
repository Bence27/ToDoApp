import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismamoduleService } from 'src/prismamodule/prismamodule.service';
import { todoDtoCreate, todoDtoDelete, todoDtoUpdate } from './dto';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismamoduleService) {}

  async getToDos(userId: number) {
    const todos = this.prismaService.toDo.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return todos;
  }

  async todoUpdate(dto: todoDtoUpdate) {
    const existingToDo = await this.prismaService.toDo.findUnique({
      where: { id: dto.id },
    });

    if (!existingToDo) {
      throw new ForbiddenException(`ToDo with ID ${dto.id} not found`);
    }

    await this.prismaService.toDo.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        description: dto.description,
        expireAt: dto.expireAt,
      },
    });
  }

  async createToDo(dto: todoDtoCreate) {
    const todo = await this.prismaService.toDo.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        expireAt: dto.expireAt,
        description: dto.description,
      },
    });
    return { todo };
  }

  async deleteToDo(dto: todoDtoDelete) {
    await this.prismaService.toDo.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
