import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import {
  Status,
  Gender,
  Generation,
  Role,
  CreateRequest,
} from 'src/common/common.constants';

const USER_MODEL = 'users';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
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
    generation: {
      type: String,
      enum: Object.values(Generation),
    },
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
