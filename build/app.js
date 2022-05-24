"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const path_1 = require("path");
const autoload_1 = require("@fastify/autoload");
const mongodb_1 = require("./utils/mongodb");
const swagger_config_1 = require("./utils/swagger-config");
const app = async (fastify, opts) => {
    await mongodb_1.default.connectDB();
    void fastify.register(require('@fastify/swagger'), swagger_config_1.default);
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'plugins'),
        options: opts,
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'routes'),
        options: opts,
    });
};
exports.app = app;
exports.default = app;
//# sourceMappingURL=app.js.map