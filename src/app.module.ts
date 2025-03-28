import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodosModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
