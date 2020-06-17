import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { GroupType } from './dto/group-type.dto';
import { GroupInput } from './inputs/group.input';

@Resolver()
export class GroupsResolver {
  constructor(
    private readonly groupsService: GroupsService,
  ) {
  }

  @Query(() => [GroupType])
  async Groups() {
    return this.groupsService.findAll();
  }

  @Mutation(() => GroupType)
  async getGroup(@Args('groupId') groupId: string) {
    return this.groupsService.getGroupById(groupId);
  }

  @Mutation(() => GroupType)
  async createGroup(@Args('input') input: GroupInput) {
    return this.groupsService.create(input);
  }

  @Mutation(() => GroupType)
  async addUserToGroup(@Args('groupId') groupId: string,
                       @Args('userId') userId: string) {

    return this.groupsService.addUserToGroup(userId, groupId);
  }

  @Mutation(() => GroupType)
  async removeUserFromGroup(@Args('groupId') groupId: string,
                       @Args('userId') userId: string) {
    return this.groupsService.removeUserFromGroup(userId, groupId);
  }
}
