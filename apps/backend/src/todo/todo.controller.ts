import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { todoDtoCreate, todoDtoDelete, todoDtoUpdate } from './dto';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('getTodos')
  getToDos(@GetUser('id') userId: number) {
    return this.todoService.getToDos(userId);
  }

  @Put('todoUpdate')
  todoUpdate(@Body() dto: todoDtoUpdate) {
    return this.todoService.todoUpdate(dto);
  }

  @Post('todoCreate')
  createToDo(@Body() dto: todoDtoCreate) {
    return this.todoService.createToDo(dto);
  }

  @Delete('todoDelete')
  deleteToDo(@Body() dto: todoDtoDelete) {
    return this.todoService.deleteToDo(dto);
  }
}
