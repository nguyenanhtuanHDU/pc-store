import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from "express-basic-auth";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.use(
    // Paths you want to protect with basic auth
    "/docs*",
    basicAuth({ // set auth cho các route
      challenge: true,
      users: {
        tuanna: '123',
        admin: '123'
      },
    })
  );
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors) {
      return new BadRequestException(Object.values(errors[0].constraints)[0])
    },
    whitelist: true
  }))
  app.setGlobalPrefix('api/v1');
  app.useStaticAssets('./src/public'); // => http://localhost:8000/images/a.jpg
  // app.useStaticAssets(join(__dirname, '..', 'public'), {prefix: '/public'});
  app.enableCors({
    origin: '*'
  })

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Test API')
    .setDescription('Created by tuanna')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {

  });
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();