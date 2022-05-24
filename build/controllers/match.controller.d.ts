import { GenericObject } from '../utils/generic-object';
declare class MatchController {
    match: (request: GenericObject, reply: GenericObject) => Promise<void>;
    getMatches: (request: GenericObject, reply: GenericObject) => Promise<void>;
}
declare const _default: MatchController;
export default _default;
