import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop()
  name: string;

  @Prop(() => [String])
  users: [string]
}

export const GroupSchema = SchemaFactory.createForClass(Group);
