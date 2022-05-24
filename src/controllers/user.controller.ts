/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { GenericObject } from '../utils/generic-object';
import User from '../models/user.model';
import Match from '../models/match.model';

const mongoose = require('mongoose');

const chalk = require('chalk');
const log = require('fancy-log');

class UserController {
  register = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      const newUser = new User({
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
        .catch((error: any) => {
          log.error(chalk.red({
            statusCode: 404,
            message: 'Not found',
            error: error.message,
            originalRequest: request.body,
          }));
        });
    } catch (error: any) {
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
  };

  login = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      let statusCode = 404;
      const loginUser = await User.findById(new mongoose.Types.ObjectId(request.body._id));
      if (loginUser) {
        statusCode = 200;
      }
      log.info(chalk.blue(loginUser));
      reply.code(statusCode).send({
        statusCode,
        response: loginUser,
      });
    } catch (error: any) {
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
  };

  getUser = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      let statusCode = 404;
      const user = await User.findById(new mongoose.Types.ObjectId(request.body._id)) || new User();
      const matchesUser = await Match.find({
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
      const userReturn = await User.find({
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
    } catch (error: any) {
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
  };

  iLikeUser = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      let statusCode = 404;
      const userLoggedIn = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(request.body._id) },
        { $push: { iHaveLike: new mongoose.Types.ObjectId(request.body.userGetLikedID) } },
      );
      const userGetLiked = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(request.body.userGetLikedID) },
        { $push: { iGotLike: new mongoose.Types.ObjectId(request.body._id) } },
      );
      if (userLoggedIn && userGetLiked) {
        statusCode = 200;
      }
      reply.code(statusCode).send({
        statusCode,
        response: 'Update successful!',
      });
    } catch (error: any) {
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
  };

  allILikeUsers = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      let statusCode = 404;
      const user = await User.findById(new mongoose.Types.ObjectId(request.body._id)) || new User();
      const arrUsersLiked = await User.find({ _id: { $in: user.iHaveLike } });
      if (arrUsersLiked.length > 0) {
        statusCode = 200;
      }
      reply.code(statusCode).send({
        statusCode,
        response: arrUsersLiked,
      });
    } catch (error: any) {
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
  };

  allGotLikeUsers = async (request: GenericObject, reply: GenericObject): Promise<void> => {
    try {
      let statusCode = 404;
      const user = await User.findById(new mongoose.Types.ObjectId(request.body._id)) || new User();
      const arrGotLiked = await User.find({ _id: { $in: user.iGotLike } });
      if (arrGotLiked) {
        statusCode = 201;
      }
      reply.code(statusCode).send({
        statusCode,
        response: arrGotLiked,
      });
    } catch (error: any) {
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
  };
}

export default new UserController();
