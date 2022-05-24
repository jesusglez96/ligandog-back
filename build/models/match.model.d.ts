/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Types, Document } from 'mongoose';
interface MatchInterface extends Document {
    _id: Types.ObjectId;
    user1_id: {
        type: Types.ObjectId;
        required: true;
    };
    user2_id: {
        type: Types.ObjectId;
        required: true;
    };
}
declare const Match: import("mongoose").Model<MatchInterface, {}, {}, {}>;
export default Match;
