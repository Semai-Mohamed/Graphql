/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Author, Post } from './Graphql/resolver';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}





@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', posts: [] },
    { id: 2, firstName: 'Bob', lastName: 'Brown', posts: [] },
  ];

  findOneById(id: number): Author | undefined {
    return this.authors.find((author) => author.id === id);
  }

  findAll(): Author[] {
    return this.authors;
  }
}





@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, content: 'Hello World' },
    { id: 2, content: 'GraphQL is awesome!' },
    { id: 3, content: 'NestJS is powerful' },
  ];

  findAll(filter?: { authorId?: number }): Post[] {
    
    return this.posts;
  }
}

