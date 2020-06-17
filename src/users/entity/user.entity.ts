import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class UserEntity extends Document {
  @Prop()
  @Field(() => ID, { nullable: true })
  id: string;
  @Prop()
  @Field({ nullable: true })
  readonly name: string;
  @Prop(() => Int)
  @Field(() => Int, { nullable: true })
  readonly age: number;
  @Prop()
  @Field({ nullable: true })
  readonly username: string;
}
