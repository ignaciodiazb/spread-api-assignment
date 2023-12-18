/**
 * Dependencies
 * We must include all third-party libraries that we use in the project
 * and are needed for this feature
 */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

/**
 * Sub-dependencies
 * We must include all libraries developed within the project
 * and are needed for this feature
 */
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply API versioning
  app.enableVersioning({ type: VersioningType.URI });

  // Apply Swagger configuration
  const configSwagger = new DocumentBuilder()
    .setTitle('Spread API assignment - API Docs')
    .setDescription('The spread API assignment docs')
    .setVersion('1.0')
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, documentSwagger);

  await app.listen(3000);
}
bootstrap();
