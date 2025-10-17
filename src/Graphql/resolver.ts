import { Query, Resolver } from "@nestjs/graphql";
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;
}
@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    return [{ id: 1, name: 'Alice' }];
  }
}
