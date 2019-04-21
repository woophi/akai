import * as mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

export const UsersSchema = new mongoose.Schema(
	{
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    avatarUrl: String,
    roles: [],
    password: {
      type: String,
      required: true
    }
  },
	{ collection: 'users' }
);

UsersSchema.plugin(timestamps);
UsersSchema.index({ title: 1 });

export default mongoose.model('Users', UsersSchema);
