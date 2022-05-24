"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = require('fancy-log');
require('dotenv').config({ path: '.env' });
class MongoDB {
    constructor() {
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: String(process.env.MONGODB_CONNECTION_URL) || 'mongodb+srv://jesus-admin:jesus-admin@findegrado.ucg3i.mongodb.net/ligandog'
        });
        Object.defineProperty(this, "connectDB", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                try {
                    const conn = await mongoose.connect(this.url);
                    if (conn) {
                        log.info(chalk.green('MongoDB connected...'));
                    }
                    else {
                        log.error(chalk.red('There is a connection error'));
                        throw new Error();
                    }
                }
                catch (error) {
                    log.error(chalk.red(error));
                    throw new Error();
                }
            }
        });
    }
}
exports.default = new MongoDB();
//# sourceMappingURL=mongodb.js.map