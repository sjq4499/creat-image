/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2021-12-07 15:58:15
 * @LastEditors: sjq
 * @LastEditTime: 2021-12-07 16:16:45
 */
export function fileToBase64(file, callback) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function () {
    callback(this.result);
  };
}
// 获取url图片的宽高尺寸
export function getImageDimensions(url) {
  return new Promise(function (resolve) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const { width, height } = img;
      resolve({ width, height });
    };
    img.src = url;
  });
}
