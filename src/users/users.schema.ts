import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Int } from 'type-graphql';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop(() => Int)
  age: number;

  @Prop()
  username: string;

  @Prop()
  friends: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);