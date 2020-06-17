import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GroupInput {
  @Field()
  readonly name: string;

  @Field(() => [String])
  readonly users: [string];
}