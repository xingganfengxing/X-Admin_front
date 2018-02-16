const ripple = module.exports;
ripple.color = '#fff';

// 消除抖动
var debounce = function (func, delay) {
  var inDebounce;
  inDebounce = undefined;
  return function () {
    var args, context;
    context = this;
    args = arguments;
    clearTimeout(inDebounce);
    return (inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay));
  };
};

// 显示涟漪
var showRipple = function (e) {
  var pos, _ripple, rippler, size, style, x, y;
  _ripple = this;
  rippler = document.createElement("span");
  size = _ripple.offsetWidth;
  pos = _ripple.getBoundingClientRect();
  x = e.pageX - pos.left - size / 2;
  y = e.pageY - pos.top - size / 2;
  style =
    "top:" +
    y +
    "px; left: " +
    x +
    "px; height: " +
    size +
    "px; width: " +
    size +
    "px; background-color: " +
    ripple.color + ";";
  _ripple.rippleContainer.appendChild(rippler);
  return rippler.setAttribute("style", style);
};

// 清除动效
var cleanUp = function () {
  while (this.rippleContainer.firstChild) {
    this.rippleContainer.removeChild(this.rippleContainer.firstChild);
  }
};

// 水波涟漪初始化
ripple.init = function (el, color) {
  const _ripple = el;
  ripple.color = color;
  const rippleContainer = document.createElement("div");
  rippleContainer.className = "ripple-container";
  _ripple.addEventListener("click", showRipple);
  _ripple.addEventListener("mouseup", debounce(cleanUp, 2000));
  _ripple.rippleContainer = rippleContainer;
  _ripple.appendChild(rippleContainer);
};
