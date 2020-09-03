import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength: 80, minlength: 3, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
});

export const User = mongoose.model<IUser>('User', userSchema);
