import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismamoduleModule } from './prismamodule/prismamodule.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    AuthModule,
    UserModule,
    TodoModule,
    PrismamoduleModule,
    EmailModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
