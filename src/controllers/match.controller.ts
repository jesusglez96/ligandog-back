/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import { GenericObject } from '../utils/generic-object';
import Match from '../models/match.model';
import User from '../models/user.model';

const mongoose = require('mongoose');

const chalk = require('chalk');
const log = require('fancy-log');

class MatchController {
  match = async (request: GenericObject, reply: GenericObject) => {
    try {
      let statusCode = 404;
      const arrIds = [
        new mongoose.Types.ObjectId(request.body.user1_id),
        new mongoose.Types.ObjectId(request.body.user2_id),
      ];
      const user1 = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(request.body.user1_id) },
        {
          $pullAll: {
            iHaveLike: arrIds,
            iGotLike: arrIds,
          },
        },
      );
      const user2 = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(request.body.user2_id) },
        {
          $pullAll: {
            iHaveLike: arrIds,
            iGotLike: arrIds,
          },
        },
      );
      const match = new Match({
        user1_id: new mongoose.Types.ObjectId(request.body.user1_id),
        user2_id: new mongoose.Types.ObjectId(request.body.user2_id),
      });
      const save = await match.save();
      if (user1 && user2 && save) {
        statusCode = 200;
      }
      log.info(
        chalk.blue(
          `newMatch: ${JSON.stringify(match)}\nuser1: ${JSON.stringify(
            user1,
          )}\nuser2: ${JSON.stringify(user2)}\nsave: ${JSON.stringify(save)}`,
        ),
      );
      reply.code(statusCode).send({
        statusCode,
        response: match || null,
      });
    } catch (error: any) {
      log.error(
        chalk.red(
          JSON.stringify({
            statusCode: 500,
            message: 'Not found',
            error: error.message,
            originalRequest: request.body,
          }),
        ),
      );
      reply.code(500).send({
        statusCode: 500,
        message: 'Not found',
        error: error.message,
        originalRequest: request.body,
      });
    }
  };

  getMatches = async (request: GenericObject, reply: GenericObject) => {
    try {
      let statusCode = 404;
      const matches = await Match.find({
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
    } catch (error: any) {
      log.error(
        chalk.red(
          JSON.stringify({
            statusCode: 500,
            message: 'Not found',
            error: error.message,
            originalRequest: request.body,
          }),
        ),
      );
      reply.code(500).send({
        statusCode: 500,
        message: 'Not found',
        error: error.message,
        originalRequest: request.body,
      });
    }
  };
}

export default new MatchController();
