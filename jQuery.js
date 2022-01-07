window.jQuery = function (selectorOrArray) {
  //   const elements = document.querySelectorAll(selectorOrArray);
  //   // 这部分就是重载
  let elements;
  console.log(selectorOrArray);
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
    console.log(elements);

    // 如果是数组函数构造的实例
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray; //保持其数组
    console.log(elements);
  }

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
    //------------------------------------------
    // 下面是查
    //------------------------------------------

    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        const arrElements = Array.from(elements[i].querySelectorAll(selector));
        console.log(arrElements);
        // concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
        array = array.concat(arrElements);

        // 也可以用for循环遍历将这些内容放入空数组中;
        // for (let i = 0; i < arrElements.length; i++) {
        //   array.push(arrElements[i]);
        // }

        console.log(array);
      }

      // 这一步操作是为了进行链式操作，这里是让elements变成了数组，可以进行数组操作
      const newApi = jQuery(array);
      return newApi;
    },
  };
};
