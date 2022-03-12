// @ts-nocheck
'use strict';

const DJSCollection = require('@discordjs/collection');
const EventEmitter = require('events');
const Coll = DJSCollection.default || DJSCollection;

/**
 * A Collection which holds a max amount of entries and sweeps periodically.
 * @param {Iterable} [iterable=null] Optional entries passed to the Map constructor.
 */
class Collection extends Coll {
  constructor(iterable) {
    super(iterable);

    this.events = new EventEmitter();
  }

  set(key, value) {
    if (typeof value === 'object') value.cache = this;
    this.events?.emit('changed', key);
    // console.log('collection set ' + key, value);
    return super.set(key, value);
  }

  delete(key) {
    this.events?.emit('changed', key);
    return super.delete(key);
  }

  array() {
    return Array.from(this, ([name, value]) => value);
  }

  // static get [Symbol.species]() {
  //   return Collection;
  // }
}

module.exports = Collection;
