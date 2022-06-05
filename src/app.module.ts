import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
  exports: [...databaseProviders],
})
export class AppModule {}
