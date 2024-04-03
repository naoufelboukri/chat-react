import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Projet 168h')
  .setDescription('Documentation sur la partie authentification du tchat')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }, 'access-token')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('168h', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.use(bodyParser.json({ limit: '100mb' }));
  await app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  await app.listen(3000);
}
bootstrap();
