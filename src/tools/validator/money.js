// 判断是否为数字
module.exports = function checkFloatNum(str){
  let reg_zs = /(([1-9][0-9]*)(\.[0-9]+)*)|([0.][1-9]+)/i;
  if (!reg_zs.test(str)) {
    return false;
  }
  if (parseFloat(str)==0) {
    return false;
  }
  return true;
};
