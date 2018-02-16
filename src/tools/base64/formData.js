/**
 * Thanks to
 *    http://www.jb51.net/article/95529.htm
 **/

/**
 * 将Base64转换为Blob对象
 *
 * @param base64Data
 * @returns {*}
 */
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1]);
  else
    byteString = unescape(base64Data.split(',')[1]);
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
}

/**
 * 将转换图片Base64转码结果封装封装返回Blob对象
 *
 * @param imageBase64 图片Base64结果
 * @returns {*}
 */
module.exports = function (imageBase64) {
  var blob = dataURItoBlob(imageBase64); // 上一步中的函数
  var canvas = document.createElement('canvas');
  var dataURL = canvas.toDataURL('image/jpeg', 0.5);
  return blob;
};





