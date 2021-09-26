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
    username: String,
    password: String,
    email: String,
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
    salt: String,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.InActive,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
    createRequest: {
      type: String,
      enum: Object.values(CreateRequest),
    },
    updatedPasswordAt: Date,
    code: String,
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(mongoosePaginate);
export { UserSchema, USER_MODEL };
