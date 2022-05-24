"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_model_1 = require("../models/match.model");
const user_model_1 = require("../models/user.model");
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = require('fancy-log');
class MatchController {
    constructor() {
        Object.defineProperty(this, "match", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const arrIds = [
                        new mongoose.Types.ObjectId(request.body.user1_id),
                        new mongoose.Types.ObjectId(request.body.user2_id),
                    ];
                    const user1 = await user_model_1.default.updateOne({ _id: new mongoose.Types.ObjectId(request.body.user1_id) }, {
                        $pullAll: {
                            iHaveLike: arrIds,
                            iGotLike: arrIds,
                        },
                    });
                    const user2 = await user_model_1.default.updateOne({ _id: new mongoose.Types.ObjectId(request.body.user2_id) }, {
                        $pullAll: {
                            iHaveLike: arrIds,
                            iGotLike: arrIds,
                        },
                    });
                    const match = new match_model_1.default({
                        user1_id: new mongoose.Types.ObjectId(request.body.user1_id),
                        user2_id: new mongoose.Types.ObjectId(request.body.user2_id),
                    });
                    const save = await match.save();
                    if (user1 && user2 && save) {
                        statusCode = 200;
                    }
                    log.info(chalk.blue(`newMatch: ${JSON.stringify(match)}\nuser1: ${JSON.stringify(user1)}\nuser2: ${JSON.stringify(user2)}\nsave: ${JSON.stringify(save)}`));
                    reply.code(statusCode).send({
                        statusCode,
                        response: match || null,
                    });
                }
                catch (error) {
                    log.error(chalk.red(JSON.stringify({
                        statusCode: 500,
                        message: 'Not found',
                        error: error.message,
                        originalRequest: request.body,
                    })));
                    reply.code(500).send({
                        statusCode: 500,
                        message: 'Not found',
                        error: error.message,
                        originalRequest: request.body,
                    });
                }
            }
        });
        Object.defineProperty(this, "getMatches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const matches = await match_model_1.default.find({
                        $or: [
                            { user1_id: new mongoose.Types.ObjectId(request.body._id) },
                            { user2_id: new mongoose.Types.ObjectId(request.body._id) },
                        ],
                    });
                    if (matches) {
                        statusCode = 200;
                    }
                    reply.code(statusCode).send({
                        statusCode,
                        response: matches,
                    });
                }
                catch (error) {
                    log.error(chalk.red(JSON.stringify({
                        statusCode: 500,
                        message: 'Not found',
                        error: error.message,
                        originalRequest: request.body,
                    })));
                    reply.code(500).send({
                        statusCode: 500,
                        message: 'Not found',
                        error: error.message,
                        originalRequest: request.body,
                    });
                }
            }
        });
    }
}
exports.default = new MatchController();
//# sourceMappingURL=match.controller.js.map