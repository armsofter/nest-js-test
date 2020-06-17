import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { UserType } from './dto/create-user.dto';
import { UserInput } from './inputs/user.input';
import { throwError } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {
  }

  async create(userType: UserInput) {
    const createdUser = new this.userModel(userType);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string) {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  async addFriend(userId: string, friendId: string) {
    const currentFriend = await this.userModel.findOne({ _id: friendId });
    if (!currentFriend && userId !== friendId) {
      return throwError('Frined not found');
    }

    const currentUser = await this.userModel.findOne({ _id: userId });
    console.log(currentUser.friends, currentUser.friends.indexOf(userId));
    if (currentUser.friends.indexOf(friendId) !== -1) {
      return throwError('user is already in friends');
    }

    currentFriend.friends.push(userId);
    await currentFriend.save();
    return this.userModel.findOneAndUpdate({ _id: userId }, { $push: { friends: friendId } });
  }

  async deleteFriend(userId: string, friendId: string) {
    const currentFriend = await this.userModel.findOne({ _id: friendId });
    if (!currentFriend && userId !== friendId) {
      return throwError('Frined not found');
    }


    const currentUser = await this.userModel.findOne({ _id: userId });
    if (currentUser.friends.indexOf(friendId) !== -1) {
      return throwError('user is already in friends');
    }

    currentFriend.friends = currentFriend.friends.fill(f => f !== userId);
    await currentFriend.save();

    return this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } });
  }

}
