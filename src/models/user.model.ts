import { Schema, model, Types, Document } from "mongoose";

interface User extends Document {
  name: String;
  image: String;
  sex: String;
  size: String;
  iHaveLike: Types.Array<Types.ObjectId>;
  iGotLike: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    sex: { type: String, required: true },
    size: { type: String, required: true },
    iHaveLike: Types.Array,
    iGotLike: Types.Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model<User>("User", userSchema);
