/* eslint-disable no-console */
const mongoose = require('mongoose');

const chalk = require('chalk');
const log = require('fancy-log');
require('dotenv').config({ path: '.env' });

class MongoDB {
  private url: string = 'mongodb+srv://jesus-admin:jesus-admin@findegrado.ucg3i.mongodb.net/ligandog';

  connectDB = async () => {
    try {
      const conn = await mongoose.connect(this.url);
      if (conn) {
        log.info(chalk.green('MongoDB connected...'));
      } else {
        log.error(chalk.red('There is a connection error'));
        throw new Error();
      }
    } catch (error) {
      log.error(chalk.red(error));
      throw new Error();
    }
  };
}

export default new MongoDB();
