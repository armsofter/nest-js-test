import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/create-user.dto';
import {UserInput} from './inputs/user.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAll()
  }

  @Mutation(() => UserType)
  async getUser(@Args('userId') userId: string) {
    return this.usersService.getUserById(userId)
  }

  @Mutation(() => UserType)
  async addFriend(@Args('userId') userId: string,
                  @Args('friendId') friendId: string) {
    return this.usersService.addFriend(userId, friendId)
  }

  @Mutation(() => UserType)
  async deleteFriend(@Args('userId') userId: string,
                  @Args('friendId') friendId: string) {
    return this.usersService.deleteFriend(userId, friendId)
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return this.usersService.create(input)
  }

}