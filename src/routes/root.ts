/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { FastifyPluginAsync } from 'fastify';
import { GenericObject } from '../utils/generic-object';

import UserController from '../controllers/user.controller';
import MatchController from '../controllers/match.controller';
import User from '../models/user.model';

const chalk = require('chalk');
const log = require('fancy-log');

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    '/register',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        const existUser = await User.findOne({
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
    },
    UserController.register,
  );
  fastify.post(
    '/login',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    UserController.login,
  );
  fastify.post(
    '/get-user',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    UserController.getUser,
  );
  fastify.post(
    '/i-like-user',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id || !request.body.userGetLikedID) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    UserController.iLikeUser,
  );
  fastify.post(
    '/all-i-like-users',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    UserController.allILikeUsers,
  );
  fastify.post(
    '/all-got-like-users',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    UserController.allGotLikeUsers,
  );
  fastify.post(
    '/match',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body.user1_id || !request.body.user2_id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    MatchController.match,
  );
  fastify.post(
    '/all-matches',
    {
      async preHandler(request: GenericObject, reply: GenericObject) {
        if (!request.body._id) {
          log.error(chalk.yellow('No id provided'));
          reply.code(422).send({
            msg: 'You must provide a valid id',
            statusCode: 422,
          });
        }
      },
    },
    MatchController.getMatches,
  );
  // Next two endpoints is to handle bad entries points
  fastify.all('/', async (request: GenericObject, reply: GenericObject) => {
    log.error(chalk.yellow("You shouldn't be here", JSON.stringify(request.body)));
    reply.code(400).send('You shouldnt be here.');
  });
  fastify.all('/*', async (request: GenericObject, reply: GenericObject) => {
    log.error(chalk.yellow("You shouldn't be here", JSON.stringify(request.body)));
    reply.code(400).send('You shouldnt be here.');
  });
};

export default root;
