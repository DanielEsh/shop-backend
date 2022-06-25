import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required,
        POSTGRES_PORT: Joi.number().required,
        POSTGRES_USER: Joi.string().required,
        POSTGRES_PASSWORD: Joi.string().required,
        POSTGRES_DB: Joi.string().required,
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
  exports: [...databaseProviders],
})
export class AppModule {}
