import mongoose from 'mongoose';

import { Password } from '../lib/password.lib';

interface UserAttributes {
  email: string;
  password: string;
}

interface UserDocument extends mongoose.Document, UserAttributes {}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
