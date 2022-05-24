"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const match_controller_1 = require("../controllers/match.controller");
const user_model_1 = require("../models/user.model");
const chalk = require('chalk');
const log = require('fancy-log');
const root = async (fastify, opts) => {
    fastify.post('/register', {
        async preHandler(request, reply) {
            const existUser = await user_model_1.default.findOne({
                email: request.body.email,
            });
            if (existUser) {
                log.error(chalk.yellow(`User email: ${request.body.email} already exists`));
                reply.code(409).send({
                    msg: 'User already exists',
                    statusCode: 409,
                });
            }
        },
    }, user_controller_1.default.register);
    fastify.post('/login', {
        async preHandler(request, reply) {
            if (!request.body._id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, user_controller_1.default.login);
    fastify.post('/get-user', {
        async preHandler(request, reply) {
            if (!request.body._id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, user_controller_1.default.getUser);
    fastify.post('/i-like-user', {
        async preHandler(request, reply) {
            if (!request.body._id || !request.body.userGetLikedID) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, user_controller_1.default.iLikeUser);
    fastify.post('/all-i-like-users', {
        async preHandler(request, reply) {
            if (!request.body._id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, user_controller_1.default.allILikeUsers);
    fastify.post('/all-got-like-users', {
        async preHandler(request, reply) {
            if (!request.body._id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, user_controller_1.default.allGotLikeUsers);
    fastify.post('/match', {
        async preHandler(request, reply) {
            if (!request.body.user1_id || !request.body.user2_id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, match_controller_1.default.match);
    fastify.post('/all-matches', {
        async preHandler(request, reply) {
            if (!request.body._id) {
                log.error(chalk.yellow('No id provided'));
                reply.code(422).send({
                    msg: 'You must provide a valid id',
                    statusCode: 422,
                });
            }
        },
    }, match_controller_1.default.getMatches);
    fastify.all('/', async (request, reply) => {
        log.error(chalk.yellow("You shouldn't be here", JSON.stringify(request.body)));
        reply.code(400).send('You shouldnt be here.');
    });
    fastify.all('/*', async (request, reply) => {
        log.error(chalk.yellow("You shouldn't be here", JSON.stringify(request.body)));
        reply.code(400).send('You shouldnt be here.');
    });
};
exports.default = root;
//# sourceMappingURL=root.js.map