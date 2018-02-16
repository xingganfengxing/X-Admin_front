/**
 * Thanks to
 *    https://github.com/be-fe/iUtils.js
 */
define(function (require, exports, module) {

  /**
   * url编码工具
   *
   * @param str
   * @returns {*}
   */
  var decode = function (str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      return str;
    }
  }

  module.exports = decode;

});
