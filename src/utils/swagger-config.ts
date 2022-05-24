/* eslint-disable import/no-unresolved */
import { GenericObject } from './generic-object';

const options: GenericObject = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'LiganDog API Documentation',
      description: 'Documentation for LiganDog API.',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
      User: {
        type: 'object',
        required: ['image', 'email', 'size', 'password', 'sex'],
        properties: {
          _id: { type: 'ObjectId' },
          name: { type: 'String' },
          email: { type: 'String' },
          password: { type: 'String' },
          image: { type: 'String' },
          sex: { type: 'String' },
          size: { type: 'String' },
          iHaveLike: { type: 'Array' },
          iGotLike: { type: 'Array' },
        },
      },
      Match: {
        type: 'object',
        required: ['user1_id', 'user2_id'],
        properties: {
          _id: { type: 'ObjectId' },
          user1_id: { type: 'ObjectId' },
          user2_id: { type: 'ObjectId' },
        },
      },
    },
  },
  uiConfig: {
    displayOperationId: true,
    tryItOutEnabled: false,
  },
  exposeRoute: true,

};

export default options;
