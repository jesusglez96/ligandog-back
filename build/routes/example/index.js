"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => 'this is an example');
};
exports.default = example;
//# sourceMappingURL=index.js.map