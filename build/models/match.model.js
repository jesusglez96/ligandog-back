"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const matchSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    user1_id: { type: mongoose_1.Types.ObjectId, required: true },
    user2_id: { type: mongoose_1.Types.ObjectId, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const Match = (0, mongoose_1.model)('Match', matchSchema);
exports.default = Match;
//# sourceMappingURL=match.model.js.map