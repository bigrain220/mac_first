import Vue from 'vue'

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    el.focus()
  }
})

Vue.directive('color', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding) {
    // console.log(el, binding)
    let displayKey = binding.value;
    if(displayKey){
      el.style.color=displayKey;
    }else{
      throw new Error("need key!can't read the value of v-color!");
    }
  }
})