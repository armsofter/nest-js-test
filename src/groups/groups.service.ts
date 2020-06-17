import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './groups.schema';
import { GroupType } from './dto/group-type.dto';
import { GroupInput } from './inputs/group.input';
import { throwError } from 'rxjs';
import { User } from '../users/users.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel('Group') private groupModel: Model<Group>,
              @InjectModel('User') private userModel: Model<User>) {
  }

  async create(groupType: GroupInput) {
    const createdUser = new this.groupModel(groupType);
    return createdUser.save();
  }

  async findAll() {
    return this.groupModel.find().exec();
  }

  async getGroupById(userId: string) {
    return this.groupModel.findOne({ _id: userId }).exec();
  }

  async addUserToGroup(userId: string, groupId: string) {

    const currentUser = await this.userModel.findOne({_id: userId});
    if (!currentUser) {
      return throwError("User not found");
    }
    const currentGroup = await this.groupModel.findOne({ _id: groupId });
    if (!currentGroup) {
      return throwError('group not found');
    }

    if (currentGroup.users.indexOf(userId) !== -1) {
      return throwError('user is alrady in group');
    }
    return this.groupModel.findOneAndUpdate({ _id: groupId }, { $push: { users: userId } });
  }

  async removeUserFromGroup(userId: string, groupId: string) {

    const currentUser = await this.userModel.findOne({_id: userId});
    if (!currentUser) {
      return throwError("User not found");
    }

    const currentGroup = await this.groupModel.findOne({ _id: groupId });
    if (!currentGroup) {
      return throwError('group not found');
    }

    if (currentGroup.users.indexOf(userId) !== -1) {
      return throwError('user is alrady in group');
    }
    return this.groupModel.findOneAndUpdate({ _id: groupId }, { $pull: { users: userId } });
  }
}
