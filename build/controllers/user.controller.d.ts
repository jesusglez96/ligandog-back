import { GenericObject } from '../utils/generic-object';
declare class UserController {
    register: (request: GenericObject, reply: GenericObject) => Promise<void>;
    login: (request: GenericObject, reply: GenericObject) => Promise<void>;
    getUser: (request: GenericObject, reply: GenericObject) => Promise<void>;
    iLikeUser: (request: GenericObject, reply: GenericObject) => Promise<void>;
    allILikeUsers: (request: GenericObject, reply: GenericObject) => Promise<void>;
    allGotLikeUsers: (request: GenericObject, reply: GenericObject) => Promise<void>;
}
declare const _default: UserController;
export default _default;
