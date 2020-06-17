import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field(() => Int, { nullable: true })
  readonly age: number;
  @Field({ nullable: true })
  readonly username: string;
  @Field(() => [String],{ nullable: true })
  readonly friends: [string];
}