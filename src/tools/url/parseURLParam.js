/**
 * Thanks to
 *    https://github.com/be-fe/iUtils.js
 */
const trim = require('../string/trim');
const pattern = /(\w+)\[(\d+)\]/;
const encode = require('./encode');
const decode = require('./decode');
/**
 * 用于解析URL中的参数
 *
 * @param str
 * @returns {{}}
 */
module.exports = function parseURLParam(str) {
  if ('string' !== typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  // if ('?' == str.charAt(0)) str = str.slice(1);
  var index = str.indexOf('?');
  if (index > -1) {
    str = str.substring(index + 1);
  }

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = pattern.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};
