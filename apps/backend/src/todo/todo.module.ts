import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [TodoService, EmailService],
  controllers: [TodoController],
})
export class TodoModule {}
