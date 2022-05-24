import {
  Schema, model, Types, Document,
} from 'mongoose';

interface UserInterface extends Document {
  _id: Types.ObjectId,
  name: String,
  email: String,
  password: String,
  image: String,
  sex: String,
  size: String,
  iHaveLike: [Types.ObjectId],
  iGotLike: [Types.ObjectId],
}

const userSchema = new Schema<UserInterface>(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    sex: { type: String, required: true },
    size: { type: String, required: true },
    iHaveLike: Array,
    iGotLike: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model<UserInterface>('User', userSchema);
export default User;
