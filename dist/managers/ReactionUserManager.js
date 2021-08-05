// @ts-nocheck
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Collection = require('../util/Collection');
const CachedManager = require('./CachedManager');
const { Error } = require('../errors');
const User = require('../structures/User');
/**
 * Manages API methods for users who reacted to a reaction and stores their cache.
 * @extends {CachedManager}
 */
class ReactionUserManager extends CachedManager {
    constructor(reaction, iterable) {
        super(reaction.client, User, iterable);
        /**
         * The reaction that this manager belongs to
         * @type {MessageReaction}
         */
        this.reaction = reaction;
    }
    /**
     * The cache of this manager
     * @type {Collection<Snowflake, User>}
     * @name ReactionUserManager#cache
     */
    /**
     * Options used to fetch users who gave a reaction.
     * @typedef {Object} FetchReactionUsersOptions
     * @property {number} [limit=100] The maximum amount of users to fetch, defaults to `100`
     * @property {Snowflake} [after] Limit fetching users to those with an id greater than the supplied id
     */
    /**
     * Fetches all the users that gave this reaction. Resolves with a collection of users, mapped by their ids.
     * @param {FetchReactionUsersOptions} [options] Options for fetching the users
     * @returns {Promise<Collection<Snowflake, User>>}
     */
    fetch({ limit = 100, after } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.reaction.message;
            const data = yield this.client.api.channels[message.channel.id].messages[message.id].reactions[this.reaction.emoji.identifier].get({ query: { limit, after } });
            const users = new Collection();
            for (const rawUser of data) {
                const user = this.client.users._add(rawUser);
                this.cache.set(user.id, user);
                users.set(user.id, user);
            }
            return users;
        });
    }
    /**
     * Removes a user from this reaction.
     * @param {UserResolvable} [user=this.client.user] The user to remove the reaction of
     * @returns {Promise<MessageReaction>}
     */
    remove(user = this.client.user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.client.users.resolveId(user);
            if (!userId)
                throw new Error('REACTION_RESOLVE_USER');
            const message = this.reaction.message;
            yield this.client.api.channels[message.channel.id].messages[message.id].reactions[this.reaction.emoji.identifier][userId === this.client.user.id ? '@me' : userId].delete();
            return this.reaction;
        });
    }
}
module.exports = ReactionUserManager;
