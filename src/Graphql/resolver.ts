import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AuthorsService, PostsService } from "src/app.service";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
export class Post {
    @Field(() => Int)
    id : number

    @Field(() => String)
    content : string 
}

@ObjectType()
export class Author {
   @Field(()=> Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post])
  posts: Post[];
}


@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author)
   author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
   posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}
