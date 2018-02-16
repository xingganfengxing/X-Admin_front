/**
 * Thanks to
 *    https://github.com/be-fe/iUtils.js
 */
define(function (require, exports, module) {

  /**
   * 字符串去除左右空格工具
   *
   * @param string
   * @param leftOrRight
   */
  var trim = function (string, leftOrRight) {

    if (leftOrRight) {

      if (leftOrRight === 'left') {
        return string.replace(/^\s*/, '');
      } else if (leftOrRight === 'right') {
        return string.replace(/\s*$/, '');
      }

    } else {
      return string.replace(/^\s*|\s*$/g, '');
    }

  }

  module.exports = trim;


});
