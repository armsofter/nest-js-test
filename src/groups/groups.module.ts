import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GroupsResolver } from './groups.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './groups.schema';
import { UserSchema } from '../users/users.schema';
import { GroupsService } from './groups.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule {
}

