window.jQuery = function (selector) {
  const elements = document.querySelectorAll(selector);

  // 1.将对象定义为api，然后return这个api
  //   const api = {
  //     addClass(className) {
  //       // 函数内操作函数外的elements，这就是闭包
  //       for (let i = 0; i < elements.length; i++) {
  //         elements[i].classList.add(className);
  //       }

  //       //   这里return之后，就能再次调用addClass,也就是进行链式操作
  //       return api;
  //     },
  //   };

  //   //   为了能够调用
  //   return api;

  // 2.省略定义，直接return方法集合的对象
  //   直接return对象，是为了能够调用里面的函数
  return {
    // 在main.js中，如果div.addClass(className).call(div,className)；也相当于div.addClass(className).call(this,className)
    addClass(className) {
      // 函数内操作函数外的elements，这就是闭包
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }

      //   这里return之后，就能再次调用addClass,也就是进行链式操作
      return this;
    },
  };
};
