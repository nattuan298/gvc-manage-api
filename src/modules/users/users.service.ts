import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './users.interface';
import { USER_MODEL } from './users.schema';
// import { MailerService } from '@nestjs-modules/mailer';
import { PaginateModel } from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';
import { paginationTransformer } from 'src/common/helpers';
import { UserResponseMessage } from './user.constant';
import { CreateRequest, Role, Status } from 'src/common/common.constants';
import { Stats } from 'fs';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateRequestDto } from './dto/update-request.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: PaginateModel<UserDocument>, // private readonly mailerService: MailerService,
  ) {}

  async userSignUp(createUserDto: CreateUserDto) {
    createUserDto.username = createUserDto.username.trim().toLowerCase();
    const regex = new RegExp(`^${createUserDto.username}$`);
    const existingUser = await this.userModel.findOne({
      username: { $regex: regex, $options: 'i' },
    });
    if (existingUser) {
      throw new ConflictException(UserResponseMessage.AlreadyExist);
    }
    const user = new this.userModel(createUserDto);
    const { salt, hashPassword } = await this.hashPassword(
      createUserDto.password,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.createRequest = CreateRequest.Wait;
    user.status = Status.Active;
    await user.save();

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    // const options = {
    //   subject: 'Welcome to GVC Management',
    //   template: 'user-create',
    //   context: {
    //     username: createUserDto.email,
    //     password: createUserDto.password,
    //     scmURL: `http://localhost:3000/verify/${code}`,
    //   },
    // };
    // await this.sendMailToUser(createUserDto.email, options);
    return {
      message: `Thanks for signing up. Please wait for admin to approve your account.`,
    };
  }

  async adminSignUp(createAdminDto: CreateAdminDto) {
    createAdminDto.username = createAdminDto.username.trim().toLowerCase();
    const regex = new RegExp(`^${createAdminDto.username}$`);
    const existingUser = await this.userModel.findOne({
      username: { $regex: regex, $options: 'i' },
    });
    if (existingUser) {
      throw new ConflictException(UserResponseMessage.AlreadyExist);
    }
    const user = new this.userModel(createAdminDto);
    const { salt, hashPassword } = await this.hashPassword(
      createAdminDto.password,
    );
    user.salt = salt;
    user.password = hashPassword;
    user.role = Role.Admin;
    user.status = Status.Active;
    await user.save();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async findAllUser(findUserDto: FindUserDto) {
    const filters: Record<string, unknown> = {};
    const options: Record<string, unknown> = {};
    options.page = findUserDto.page;
    options.limit = findUserDto.pageSize;
    if (findUserDto.status) {
      filters.status = findUserDto.status;
    }
    if (findUserDto.createRequest) {
      filters.createRequest = findUserDto.createRequest;
    }
    if (findUserDto.keyword) {
      const keyword = new RegExp(findUserDto.keyword.trim(), 'i');
      filters.username = keyword;
    }
    const users = await this.userModel.paginate(filters, options);
    return paginationTransformer(users);
  }

  async updateCreateRequest(id: string, createRequestDto: CreateRequestDto) {
    await this.userModel.updateOne(
      { _id: id },
      { createRequest: createRequestDto.createRequest },
    );
  }

  async getUserByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return {
      salt,
      hashPassword,
    };
  }

  async validatePassword(
    password: string,
    currentPassword: string,
  ): Promise<boolean> {
    const hashPassword = await bcrypt.compare(password, currentPassword);
    return hashPassword;
  }

  async validateUser(email: string, username: string): Promise<any> {
    return this.userModel.findOne({ email, username });
  }

  // async sendMailToUser(email: string, options): Promise<any> {
  //   return this.mailerService
  //     .sendMail({
  //       to: email,
  //       from: process.env.MAIL_USERNAME,
  //       subject: options.subject,
  //       template: `./${options.template}`,
  //       context: options.context,
  //     })
  //     .then((res) => {
  //       console.log('Send mail success to user');
  //     })
  //     .catch((err) => {
  //       console.log('Error while sending mail to carrier', err);
  //     });
  // }
}
