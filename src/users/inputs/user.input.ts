import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly username: string

  @Field(() => [String], { nullable: true })
  readonly friends: [string];
}