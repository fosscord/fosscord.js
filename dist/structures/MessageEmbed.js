// @ts-nocheck
'use strict';
const { RangeError } = require('../errors');
const Util = require('../util/Util');
/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
class MessageEmbed {
    /**
     * @name MessageEmbed
     * @kind constructor
     * @memberof MessageEmbed
     * @param {MessageEmbed|MessageEmbedOptions} [data={}] MessageEmbed to clone or raw embed data
     */
    /**
     * A `Partial` object is a representation of any existing object.
     * This object contains between 0 and all of the original objects parameters.
     * This is true regardless of whether the parameters are optional in the base object.
     * @typedef {Object} Partial
     */
    /**
     * Represents the possible options for a MessageEmbed
     * @typedef {Object} MessageEmbedOptions
     * @property {string} [title] The title of this embed
     * @property {string} [description] The description of this embed
     * @property {string} [url] The URL of this embed
     * @property {Date|number} [timestamp] The timestamp of this embed
     * @property {ColorResolvable} [color] The color of this embed
     * @property {EmbedFieldData[]} [fields] The fields of this embed
     * @property {Partial<MessageEmbedAuthor>} [author] The author of this embed
     * @property {Partial<MessageEmbedThumbnail>} [thumbnail] The thumbnail of this embed
     * @property {Partial<MessageEmbedImage>} [image] The image of this embed
     * @property {Partial<MessageEmbedVideo>} [video] The video of this embed
     * @property {Partial<MessageEmbedFooter>} [footer] The footer of this embed
     */
    constructor(data = {}, skipValidation = false) {
        this.setup(data, skipValidation);
    }
    setup(data, skipValidation) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        /**
         * The type of this embed, either:
         * * `rich` - a rich embed
         * * `image` - an image embed
         * * `video` - a video embed
         * * `gifv` - a gifv embed
         * * `article` - an article embed
         * * `link` - a link embed
         * @type {string}
         * @deprecated
         */
        this.type = (_a = data.type) !== null && _a !== void 0 ? _a : 'rich';
        /**
         * The title of this embed
         * @type {?string}
         */
        this.title = (_b = data.title) !== null && _b !== void 0 ? _b : null;
        /**
         * The description of this embed
         * @type {?string}
         */
        this.description = (_c = data.description) !== null && _c !== void 0 ? _c : null;
        /**
         * The URL of this embed
         * @type {?string}
         */
        this.url = (_d = data.url) !== null && _d !== void 0 ? _d : null;
        /**
         * The color of this embed
         * @type {?number}
         */
        this.color = 'color' in data ? Util.resolveColor(data.color) : null;
        /**
         * The timestamp of this embed
         * @type {?number}
         */
        this.timestamp = 'timestamp' in data ? new Date(data.timestamp).getTime() : null;
        /**
         * Represents a field of a MessageEmbed
         * @typedef {Object} EmbedField
         * @property {string} name The name of this field
         * @property {string} value The value of this field
         * @property {boolean} inline If this field will be displayed inline
         */
        /**
         * The fields of this embed
         * @type {EmbedField[]}
         */
        this.fields = [];
        if (data.fields) {
            this.fields = skipValidation ? data.fields.map(Util.cloneObject) : this.constructor.normalizeFields(data.fields);
        }
        /**
         * Represents the thumbnail of a MessageEmbed
         * @typedef {Object} MessageEmbedThumbnail
         * @property {string} url URL for this thumbnail
         * @property {string} proxyURL ProxyURL for this thumbnail
         * @property {number} height Height of this thumbnail
         * @property {number} width Width of this thumbnail
         */
        /**
         * The thumbnail of this embed (if there is one)
         * @type {?MessageEmbedThumbnail}
         */
        this.thumbnail = data.thumbnail
            ? {
                url: data.thumbnail.url,
                proxyURL: (_e = data.thumbnail.proxyURL) !== null && _e !== void 0 ? _e : data.thumbnail.proxy_url,
                height: data.thumbnail.height,
                width: data.thumbnail.width,
            }
            : null;
        /**
         * Represents the image of a MessageEmbed
         * @typedef {Object} MessageEmbedImage
         * @property {string} url URL for this image
         * @property {string} proxyURL ProxyURL for this image
         * @property {number} height Height of this image
         * @property {number} width Width of this image
         */
        /**
         * The image of this embed, if there is one
         * @type {?MessageEmbedImage}
         */
        this.image = data.image
            ? {
                url: data.image.url,
                proxyURL: (_f = data.image.proxyURL) !== null && _f !== void 0 ? _f : data.image.proxy_url,
                height: data.image.height,
                width: data.image.width,
            }
            : null;
        /**
         * Represents the video of a MessageEmbed
         * @typedef {Object} MessageEmbedVideo
         * @property {string} url URL of this video
         * @property {string} proxyURL ProxyURL for this video
         * @property {number} height Height of this video
         * @property {number} width Width of this video
         */
        /**
         * The video of this embed (if there is one)
         * @type {?MessageEmbedVideo}
         * @readonly
         */
        this.video = data.video
            ? {
                url: data.video.url,
                proxyURL: (_g = data.video.proxyURL) !== null && _g !== void 0 ? _g : data.video.proxy_url,
                height: data.video.height,
                width: data.video.width,
            }
            : null;
        /**
         * Represents the author field of a MessageEmbed
         * @typedef {Object} MessageEmbedAuthor
         * @property {string} name The name of this author
         * @property {string} url URL of this author
         * @property {string} iconURL URL of the icon for this author
         * @property {string} proxyIconURL Proxied URL of the icon for this author
         */
        /**
         * The author of this embed (if there is one)
         * @type {?MessageEmbedAuthor}
         */
        this.author = data.author
            ? {
                name: data.author.name,
                url: data.author.url,
                iconURL: (_h = data.author.iconURL) !== null && _h !== void 0 ? _h : data.author.icon_url,
                proxyIconURL: (_j = data.author.proxyIconURL) !== null && _j !== void 0 ? _j : data.author.proxy_icon_url,
            }
            : null;
        /**
         * Represents the provider of a MessageEmbed
         * @typedef {Object} MessageEmbedProvider
         * @property {string} name The name of this provider
         * @property {string} url URL of this provider
         */
        /**
         * The provider of this embed (if there is one)
         * @type {?MessageEmbedProvider}
         */
        this.provider = data.provider
            ? {
                name: data.provider.name,
                url: data.provider.name,
            }
            : null;
        /**
         * Represents the footer field of a MessageEmbed
         * @typedef {Object} MessageEmbedFooter
         * @property {string} text The text of this footer
         * @property {string} iconURL URL of the icon for this footer
         * @property {string} proxyIconURL Proxied URL of the icon for this footer
         */
        /**
         * The footer of this embed
         * @type {?MessageEmbedFooter}
         */
        this.footer = data.footer
            ? {
                text: data.footer.text,
                iconURL: (_k = data.footer.iconURL) !== null && _k !== void 0 ? _k : data.footer.icon_url,
                proxyIconURL: (_l = data.footer.proxyIconURL) !== null && _l !== void 0 ? _l : data.footer.proxy_icon_url,
            }
            : null;
    }
    /**
     * The date displayed on this embed
     * @type {?Date}
     * @readonly
     */
    get createdAt() {
        return this.timestamp ? new Date(this.timestamp) : null;
    }
    /**
     * The hexadecimal version of the embed color, with a leading hash
     * @type {?string}
     * @readonly
     */
    get hexColor() {
        return this.color ? `#${this.color.toString(16).padStart(6, '0')}` : null;
    }
    /**
     * The accumulated length for the embed title, description, fields, footer text, and author name
     * @type {number}
     * @readonly
     */
    get length() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (((_b = (_a = this.title) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) +
            ((_d = (_c = this.description) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) +
            (this.fields.length >= 1
                ? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
                : 0) +
            ((_f = (_e = this.footer) === null || _e === void 0 ? void 0 : _e.text.length) !== null && _f !== void 0 ? _f : 0) +
            ((_h = (_g = this.author) === null || _g === void 0 ? void 0 : _g.name.length) !== null && _h !== void 0 ? _h : 0));
    }
    /**
     * Adds a field to the embed (max 25).
     * @param {string} name The name of this field
     * @param {string} value The value of this field
     * @param {boolean} [inline=false] If this field will be displayed inline
     * @returns {MessageEmbed}
     */
    addField(name, value, inline) {
        return this.addFields({ name, value, inline });
    }
    /**
     * Adds fields to the embed (max 25).
     * @param {...EmbedFieldData|EmbedFieldData[]} fields The fields to add
     * @returns {MessageEmbed}
     */
    addFields(...fields) {
        this.fields.push(...this.constructor.normalizeFields(fields));
        return this;
    }
    /**
     * Removes, replaces, and inserts fields in the embed (max 25).
     * @param {number} index The index to start at
     * @param {number} deleteCount The number of fields to remove
     * @param {...EmbedFieldData|EmbedFieldData[]} [fields] The replacing field objects
     * @returns {MessageEmbed}
     */
    spliceFields(index, deleteCount, ...fields) {
        this.fields.splice(index, deleteCount, ...this.constructor.normalizeFields(...fields));
        return this;
    }
    /**
     * Sets the embed's fields (max 25).
     * @param {...EmbedFieldData|EmbedFieldData[]} fields The fields to set
     * @returns {MessageEmbed}
     */
    setFields(...fields) {
        this.spliceFields(0, this.fields.length, fields);
        return this;
    }
    /**
     * Sets the author of this embed.
     * @param {string} name The name of the author
     * @param {string} [iconURL] The icon URL of the author
     * @param {string} [url] The URL of the author
     * @returns {MessageEmbed}
     */
    setAuthor(name, iconURL, url) {
        this.author = { name: Util.verifyString(name, RangeError, 'EMBED_AUTHOR_NAME'), iconURL, url };
        return this;
    }
    /**
     * Sets the color of this embed.
     * @param {ColorResolvable} color The color of the embed
     * @returns {MessageEmbed}
     */
    setColor(color) {
        this.color = Util.resolveColor(color);
        return this;
    }
    /**
     * Sets the description of this embed.
     * @param {string} description The description
     * @returns {MessageEmbed}
     */
    setDescription(description) {
        this.description = Util.verifyString(description, RangeError, 'EMBED_DESCRIPTION');
        return this;
    }
    /**
     * Sets the footer of this embed.
     * @param {string} text The text of the footer
     * @param {string} [iconURL] The icon URL of the footer
     * @returns {MessageEmbed}
     */
    setFooter(text, iconURL) {
        this.footer = { text: Util.verifyString(text, RangeError, 'EMBED_FOOTER_TEXT'), iconURL };
        return this;
    }
    /**
     * Sets the image of this embed.
     * @param {string} url The URL of the image
     * @returns {MessageEmbed}
     */
    setImage(url) {
        this.image = { url };
        return this;
    }
    /**
     * Sets the thumbnail of this embed.
     * @param {string} url The URL of the thumbnail
     * @returns {MessageEmbed}
     */
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    /**
     * Sets the timestamp of this embed.
     * @param {Date|number} [timestamp=Date.now()] The timestamp or date
     * @returns {MessageEmbed}
     */
    setTimestamp(timestamp = Date.now()) {
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        this.timestamp = timestamp;
        return this;
    }
    /**
     * Sets the title of this embed.
     * @param {string} title The title
     * @returns {MessageEmbed}
     */
    setTitle(title) {
        this.title = Util.verifyString(title, RangeError, 'EMBED_TITLE');
        return this;
    }
    /**
     * Sets the URL of this embed.
     * @param {string} url The URL
     * @returns {MessageEmbed}
     */
    setURL(url) {
        this.url = url;
        return this;
    }
    /**
     * Transforms the embed to a plain object.
     * @returns {APIEmbed} The raw data of this embed
     */
    toJSON() {
        return {
            title: this.title,
            type: 'rich',
            description: this.description,
            url: this.url,
            timestamp: this.timestamp && new Date(this.timestamp),
            color: this.color,
            fields: this.fields,
            thumbnail: this.thumbnail,
            image: this.image,
            author: this.author && {
                name: this.author.name,
                url: this.author.url,
                icon_url: this.author.iconURL,
            },
            footer: this.footer && {
                text: this.footer.text,
                icon_url: this.footer.iconURL,
            },
        };
    }
    /**
     * Normalizes field input and resolves strings.
     * @param {string} name The name of the field
     * @param {string} value The value of the field
     * @param {boolean} [inline=false] Set the field to display inline
     * @returns {EmbedField}
     */
    static normalizeField(name, value, inline = false) {
        return {
            name: Util.verifyString(name, RangeError, 'EMBED_FIELD_NAME', false),
            value: Util.verifyString(value, RangeError, 'EMBED_FIELD_VALUE', false),
            inline,
        };
    }
    /**
     * @typedef {Object} EmbedFieldData
     * @property {string} name The name of this field
     * @property {string} value The value of this field
     * @property {boolean} [inline] If this field will be displayed inline
     */
    /**
     * Normalizes field input and resolves strings.
     * @param  {...EmbedFieldData|EmbedFieldData[]} fields Fields to normalize
     * @returns {EmbedField[]}
     */
    static normalizeFields(...fields) {
        return fields
            .flat(2)
            .map(field => this.normalizeField(field.name, field.value, typeof field.inline === 'boolean' ? field.inline : false));
    }
}
module.exports = MessageEmbed;