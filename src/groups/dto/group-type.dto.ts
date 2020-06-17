import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class GroupType {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  readonly name: string;
  @Field(() => [String], { nullable: true })
  readonly users: [string];
}