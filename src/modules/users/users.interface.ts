import { Document } from 'mongoose';
import {
  CreateRequest,
  Gender,
  Generation,
  Role,
  Status,
} from 'src/common/common.constants';
export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  generation: Generation;
  gender: Gender;
  dateOfBirth: string;
  status?: Status;
  createRequest?: CreateRequest;
  roles?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = IUser & Document;
