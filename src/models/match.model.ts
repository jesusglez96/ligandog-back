import {
  Schema, model, Types, Document,
} from 'mongoose';

interface MatchInterface extends Document {
  _id: Types.ObjectId,
  user1_id: { type: Types.ObjectId; required: true },
  user2_id: { type: Types.ObjectId; required: true },
}

const matchSchema = new Schema<MatchInterface>(
  {
    _id: Types.ObjectId,
    user1_id: { type: Types.ObjectId, required: true },
    user2_id: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Match = model<MatchInterface>('Match', matchSchema);
export default Match;
