/* eslint-disable global-require */
/* eslint-disable no-void */
/* eslint-disable import/no-unresolved */
import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { fastify, FastifyInstance } from 'fastify';
import MongoDB from './utils/mongodb';
import options from './utils/swagger-config';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
const chalk = require('chalk');
const log = require('fancy-log');
require('dotenv').config({ path: '.env' });

const serverFastify: FastifyInstance = fastify();
// export type AppOptions = {
//   // Place your custom options for app below here.
// } & Partial<AutoloadPluginOptions>;

// const app: FastifyPluginAsync<AppOptions> = async (
//   fastify,
//   opts,
// ): Promise<void> => {
//   // Place here your custom code!
MongoDB.connectDB();
void serverFastify.register(require('@fastify/swagger'), options);
// Do not touch the following lines

//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
void serverFastify.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
  // options: opts,
});

//   // This loads all plugins defined in routes
//   // define your routes in one of these
void serverFastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  // options: opts,
});
// };

// export default app;
// export { app };
const start = async (port: any, host: any) => {
  serverFastify.listen(port, host, (err: any, address: any) => {
    if (err) {
      log.error(chalk.red(err));
      process.exit(1);
    }
    log.info(chalk.blue(`Server listening at ${address}`));
  });
};

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
start(port, host);
