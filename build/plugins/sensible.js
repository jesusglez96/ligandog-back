"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const sensible_1 = require("@fastify/sensible");
exports.default = (0, fastify_plugin_1.default)(async (fastify, opts) => {
    fastify.register(sensible_1.default, {
        errorHandler: false,
    });
});
//# sourceMappingURL=sensible.js.map