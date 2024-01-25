import { Global, Module } from '@nestjs/common';
import { PrismamoduleService } from './prismamodule.service';

@Global()
@Module({
  providers: [PrismamoduleService],
  exports: [PrismamoduleService],
})
export class PrismamoduleModule {}
