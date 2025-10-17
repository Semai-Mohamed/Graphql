import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLSchemaHost } from '@nestjs/graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const {schema} = app.get(GraphQLSchemaHost)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
