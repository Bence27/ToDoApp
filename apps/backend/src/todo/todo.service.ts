import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismamoduleService } from 'src/prismamodule/prismamodule.service';
import { todoDtoCreate, todoDtoDelete, todoDtoUpdate } from './dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TodoService {
  constructor(
    private prismaService: PrismamoduleService,
    private emailService: EmailService,
  ) {}

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
    this.emailService.sendMail(
      dto.email,
      'ToDo Updated',
      `ToDo created \n Title: ${dto.title} \n Description: ${dto.description} \n Expire at: ${dto.expireAt}`,
    );
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
    this.emailService.sendMail(
      dto.email,
      'ToDo created',
      `ToDo created \n Title: ${dto.title} \n Description: ${dto.description} \n Expire at: ${dto.expireAt}`,
    );
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
