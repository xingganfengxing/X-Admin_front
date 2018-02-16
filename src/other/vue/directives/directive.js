import Vue from 'vue'
import rippler from '../../../tools/ripple/ripple'

// 图片懒加载
const lazyLoad = Vue.directive("lazy-load", {
  inserted: function (el, binding) {
    const color = Math.floor(Math.random() * 1000000);
    el.style.backgroundColor = '#' + color;

    const img = new Image();
    img.src = binding.value;
    img.onload = function () {
      el.style.backgroundImage = 'url(' + binding.value + ')';
      el.style.backgroundSize = '100% 100%';
      el.style.backgroundPosition = 'center';
    }
  }
});

// 水波涟漪
const ripple = Vue.directive("ripple", {
  bind: function (el, binding) {
    if (binding.value.active) {
      const color = binding.value.color;
      rippler.init(el, color);
    }
  }
});

export default { lazyLoad, ripple };

