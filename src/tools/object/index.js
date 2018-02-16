/**
 * 对象、字符串判空检测工具
 *
 */

const Object = module.exports;

Object.isNotEmptyObject = function (obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};

Object.isNotEmptyString = function (str) {
  return isString(s) && s !== '';
};


