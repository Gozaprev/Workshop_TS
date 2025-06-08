import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,            // <-- enables auto-transformation of payloads
      whitelist: true,            // optional: strips unknown props
      forbidNonWhitelisted: true, // optional: throws error on unknown props
    }),
  );

  ////////////////

  // async function bootstrap() {
  //   const app = await NestFactory.create(AppModule);
  //   app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  //   await app.listen(3000);
  // }
  //////////////////

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
