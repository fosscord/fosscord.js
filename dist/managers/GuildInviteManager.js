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
const Invite = require('../structures/Invite');
const DataResolver = require('../util/DataResolver');
/**
 * Manages API methods for GuildInvites and stores their cache.
 * @extends {CachedManager}
 */
class GuildInviteManager extends CachedManager {
    constructor(guild, iterable) {
        super(guild.client, Invite, iterable);
        /**
         * The guild this Manager belongs to
         * @type {Guild}
         */
        this.guild = guild;
    }
    /**
     * The cache of this Manager
     * @type {Collection<string, Invite>}
     * @name GuildInviteManager#cache
     */
    _add(data, cache) {
        return super._add(data, cache, { id: data.code, extras: [this.guild] });
    }
    /**
     * Data that resolves to give an Invite object. This can be:
     * * An invite code
     * * An invite URL
     * @typedef {string} InviteResolvable
     */
    /**
     * Resolves an InviteResolvable to an Invite object.
     * @method resolve
     * @memberof GuildInviteManager
     * @instance
     * @param {InviteResolvable} invite The invite resolvable to resolve
     * @returns {?Invite}
     */
    /**
     * Resolves an InviteResolvable to an invite code string.
     * @method resolveId
     * @memberof GuildInviteManager
     * @instance
     * @param {InviteResolvable} invite The invite resolvable to resolve
     * @returns {?string}
     */
    /**
     * Options used to fetch a single invite from a guild.
     * @typedef {Object} FetchInviteOptions
     * @property {InviteResolvable} code The invite to fetch
     * @property {boolean} [cache=true] Whether or not to cache the fetched invite
     * @property {boolean} [force=false] Whether to skip the cache check and request the API
     */
    /**
     * Options used to fetch all invites from a guild.
     * @typedef {Object} FetchInvitesOptions
     * @property {GuildChannelResolvable} [channelId] The channel to fetch all invites from
     * @property {boolean} [cache=true] Whether or not to cache the fetched invites
     */
    /**
     * Fetches invite(s) from Discord.
     * @param {InviteResolvable|FetchInviteOptions|FetchInvitesOptions} [options] Options for fetching guild invite(s)
     * @returns {Promise<Invite|Collection<string, Invite>>}
     * @example
     * // Fetch all invites from a guild
     * guild.invites.fetch()
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetch all invites from a guild without caching
     * guild.invites.fetch({ cache: false })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetch all invites from a channel
     * guild.invites.fetch({ channelId: '222197033908436994' })
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetch a single invite
     * guild.invites.fetch('bRCvFy9')
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Fetch a single invite without checking cache
     * guild.invites.fetch({ code: 'bRCvFy9', force: true })
     *   .then(console.log)
     *   .catch(console.error)
     * @example
     * // Fetch a single invite without caching
     * guild.invites.fetch({ code: 'bRCvFy9', cache: false })
     *   .then(console.log)
     *   .catch(console.error);
     */
    fetch(options) {
        if (!options)
            return this._fetchMany();
        if (typeof options === 'string') {
            const code = DataResolver.resolveInviteCode(options);
            if (!code)
                return Promise.reject(new Error('INVITE_RESOLVE_CODE'));
            return this._fetchSingle({ code, cache: true });
        }
        if (!options.code) {
            if (options.channelId) {
                const id = this.guild.channels.resolveId(options.channelId);
                if (!id)
                    return Promise.reject(new Error('GUILD_CHANNEL_RESOLVE'));
                return this._fetchChannelMany(id, options.cache);
            }
            if ('cache' in options)
                return this._fetchMany(options.cache);
            return Promise.reject(new Error('INVITE_RESOLVE_CODE'));
        }
        return this._fetchSingle(Object.assign(Object.assign({}, options), { code: DataResolver.resolveInviteCode(options.code) }));
    }
    _fetchSingle({ code, cache, force = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!force) {
                const existing = this.cache.get(code);
                if (existing)
                    return existing;
            }
            const invites = yield this._fetchMany(cache);
            const invite = invites.get(code);
            if (!invite)
                throw new Error('INVITE_NOT_FOUND');
            return invite;
        });
    }
    _fetchMany(cache) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.api.guilds(this.guild.id).invites.get();
            return data.reduce((col, invite) => col.set(invite.code, this._add(invite, cache)), new Collection());
        });
    }
    _fetchChannelMany(channelId, cache) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.api.channels(channelId).invites.get();
            return data.reduce((col, invite) => col.set(invite.code, this._add(invite, cache)), new Collection());
        });
    }
    /**
     * Create an invite to the guild from the provided channel.
     * @param {GuildChannelResolvable} channel The options for creating the invite from a channel.
     * @param {CreateInviteOptions} [options={}] The options for creating the invite from a channel.
     * @returns {Promise<Invite>}
     * @example
     * // Create an invite to a selected channel
     * guild.invites.create('599942732013764608')
     *   .then(console.log)
     *   .catch(console.error);
     */
    create(channel, { temporary = false, maxAge = 86400, maxUses = 0, unique, targetUser, targetApplication, targetType, reason } = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.guild.channels.resolveId(channel);
            if (!id)
                throw new Error('GUILD_CHANNEL_RESOLVE');
            const invite = yield this.client.api.channels(id).invites.post({
                data: {
                    temporary,
                    max_age: maxAge,
                    max_uses: maxUses,
                    unique,
                    target_user_id: this.client.users.resolveId(targetUser),
                    target_application_id: (_b = (_a = targetApplication === null || targetApplication === void 0 ? void 0 : targetApplication.id) !== null && _a !== void 0 ? _a : targetApplication === null || targetApplication === void 0 ? void 0 : targetApplication.applicationId) !== null && _b !== void 0 ? _b : targetApplication,
                    target_type: targetType,
                },
                reason,
            });
            return new Invite(this.client, invite);
        });
    }
    /**
     * Deletes an invite.
     * @param {InviteResolvable} invite The invite to delete
     * @param {string} [reason] Reason for deleting the invite
     * @returns {Promise<void>}
     */
    delete(invite, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = DataResolver.resolveInviteCode(invite);
            yield this.client.api.invites(code).delete({ reason });
        });
    }
}
module.exports = GuildInviteManager;
