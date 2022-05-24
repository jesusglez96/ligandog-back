"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const match_model_1 = require("../models/match.model");
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = require('fancy-log');
class UserController {
    constructor() {
        Object.defineProperty(this, "register", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    const newUser = new user_model_1.default({
                        _id: new mongoose.Types.ObjectId(),
                        name: request.body.name,
                        email: request.body.email,
                        password: request.body.password,
                        image: request.body.image,
                        sex: request.body.sex,
                        size: request.body.size,
                        iHaveLike: [],
                        iGotLike: [],
                    });
                    await newUser
                        .save()
                        .then((result) => {
                        log.info(chalk.blue(result));
                        reply.code(201).send(newUser);
                    })
                        .catch((error) => {
                        log.error(chalk.red({
                            statusCode: 404,
                            message: 'Not found',
                            error: error.message,
                            originalRequest: request.body,
                        }));
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
        Object.defineProperty(this, "login", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const loginUser = await user_model_1.default.findById(new mongoose.Types.ObjectId(request.body._id));
                    if (loginUser) {
                        statusCode = 200;
                    }
                    log.info(chalk.blue(loginUser));
                    reply.code(statusCode).send({
                        statusCode,
                        response: loginUser,
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
        Object.defineProperty(this, "getUser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const user = await user_model_1.default.findById(new mongoose.Types.ObjectId(request.body._id)) || new user_model_1.default();
                    const matchesUser = await match_model_1.default.find({
                        $or: [
                            { user2_id: new mongoose.Types.ObjectId(request.body._id) },
                            { user1_id: new mongoose.Types.ObjectId(request.body._id) },
                        ],
                    });
                    const arrMatchesUsers = matchesUser.length > 0
                        ? matchesUser.map((match) => {
                            if (user && match.user1_id.toString() === user._id.toString()) {
                                return match.user2_id;
                            }
                            return match.user1_id;
                        })
                        : [];
                    const userReturn = await user_model_1.default.find({
                        $and: [
                            { _id: { $nin: user.iHaveLike } },
                            { _id: { $nin: arrMatchesUsers } },
                            { size: { $eq: user.size } },
                            { sex: { $ne: user.sex } },
                        ],
                    });
                    const returned = userReturn[Math.round(Math.random() * (userReturn.length - 1))];
                    if (returned) {
                        statusCode = 200;
                    }
                    log.info(chalk.blue(returned));
                    reply.code(statusCode).send({
                        statusCode,
                        response: returned || null,
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
        Object.defineProperty(this, "iLikeUser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const userLoggedIn = await user_model_1.default.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(request.body._id) }, { $push: { iHaveLike: new mongoose.Types.ObjectId(request.body.userGetLikedID) } });
                    const userGetLiked = await user_model_1.default.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(request.body.userGetLikedID) }, { $push: { iGotLike: new mongoose.Types.ObjectId(request.body._id) } });
                    if (userLoggedIn && userGetLiked) {
                        statusCode = 200;
                    }
                    reply.code(statusCode).send({
                        statusCode,
                        response: 'Update successful!',
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
        Object.defineProperty(this, "allILikeUsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const user = await user_model_1.default.findById(new mongoose.Types.ObjectId(request.body._id)) || new user_model_1.default();
                    const arrUsersLiked = await user_model_1.default.find({ _id: { $in: user.iHaveLike } });
                    if (arrUsersLiked.length > 0) {
                        statusCode = 200;
                    }
                    reply.code(statusCode).send({
                        statusCode,
                        response: arrUsersLiked,
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
        Object.defineProperty(this, "allGotLikeUsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, reply) => {
                try {
                    let statusCode = 404;
                    const user = await user_model_1.default.findById(new mongoose.Types.ObjectId(request.body._id)) || new user_model_1.default();
                    const arrGotLiked = await user_model_1.default.find({ _id: { $in: user.iGotLike } });
                    if (arrGotLiked) {
                        statusCode = 201;
                    }
                    reply.code(statusCode).send({
                        statusCode,
                        response: arrGotLiked,
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
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map