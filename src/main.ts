/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { RedisIoAdapter } from './webSocket/RedisIoAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisAdapter = new RedisIoAdapter(app)
  await redisAdapter.connectToRedis()
  app.useWebSocketAdapter(redisAdapter)
  // const {schema} = app.get(GraphQLSchemaHost)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
