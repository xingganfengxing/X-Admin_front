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
  var encode = function (str) {
      try {
          return encodeURIComponent(str);
      } catch (e) {
          return str;
      }
  };

  module.exports = encode;

});
