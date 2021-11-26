import mongoose from 'mongoose';
import { SchemaNames, User } from './types';
const timestamps = require('mongoose-timestamp');

export const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    lastName: String,
    avatarUrl: String,
    roles: [],
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    resetId: {
      type: String,
    },
  },
  { collection: SchemaNames.USERS }
);

UsersSchema.plugin(timestamps);
UsersSchema.index({ email: 1 });

export const UserTable = mongoose.model<User>(SchemaNames.USERS, UsersSchema);

export default UserTable;
