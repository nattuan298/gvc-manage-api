import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import {
  Status,
  Gender,
  Role,
  CreateRequest,
} from 'src/common/common.constants';

const USER_MODEL = 'users';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    status: {
      type: String,
      enum: Object.values(Status),
    },
    username: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    generation: String,
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    dateOfBirth: Date,
    roles: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
    request: {
      type: String,
      enum: Object.values(CreateRequest),
      default: CreateRequest.Reject,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(mongoosePaginate);
export { UserSchema, USER_MODEL };
