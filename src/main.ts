import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || 'https://job-x-tracker.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // For Throwing error if additional keys which are not part of ValidationDTOs
      transform: true, // for incoming request to change the typeof body to Dto
      transformOptions: {
        enableImplicitConversion: true, // We can get rif og @Type(()=>Number) conversions
      },
    }),
  );

  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('JobXTracker Api Documentation')
    .setDescription('Use the REST API base URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'http://www.opens.sourceforge.net')
    .addServer('http://localhost:3005')
    .setVersion('1.0')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  // Apply Document to the app
  SwaggerModule.setup('swagger', app, document);

  // Start the application
  // The port is set in .env file and defaults to 3000 if not provided.
  // This will be used in production as well as development environment
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
