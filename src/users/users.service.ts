import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  updateToken(id: string, refreshToken: string): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, { refreshToken }, { new: true })
      .exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
