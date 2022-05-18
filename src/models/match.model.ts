import { Schema, model, Types, Document } from "mongoose";

interface Match extends Document {
  user1_id: { type: Types.ObjectId; required: true };
  user2_id: { type: Types.ObjectId; required: true };
}

const matchSchema = new Schema<Match>(
  {
    user1_id: { type: Types.ObjectId, required: true },
    user2_id: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model<Match>("Match", matchSchema);
