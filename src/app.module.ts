import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, AuthorsService, PostsService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsResolver } from './Graphql/resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ChatGateway } from './webSocket/socket';
import { RedisIoAdapter } from './webSocket/RedisIoAdapter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql : false,
      csrfPrevention : false,
      plugins : [ApolloServerPluginLandingPageLocalDefault()]

    }),
  ],
  controllers: [AppController],
  providers: [AppService,AuthorsResolver,AuthorsService,PostsService,ChatGateway,RedisIoAdapter],
})
export class AppModule {}
