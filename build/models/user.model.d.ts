/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Types, Document } from 'mongoose';
interface UserInterface extends Document {
    _id: Types.ObjectId;
    name: String;
    email: String;
    password: String;
    image: String;
    sex: String;
    size: String;
    iHaveLike: [Types.ObjectId];
    iGotLike: [Types.ObjectId];
}
declare const User: import("mongoose").Model<UserInterface, {}, {}, {}>;
export default User;
