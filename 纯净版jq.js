window.jQuery = function (selectorOrArray) {
  let elements;

  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);

    // 如果是数组函数构造的实例
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray; //保持其数组
  }

  return {
    //   给当前对象添加一个属性，存放jQuery参数的oldApi属性（也就是旧的this)
    oldApi: selectorOrArray.oldApi,
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      return this;
    },

    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        const arrElements = Array.from(elements[i].querySelectorAll(selector));
        console.log(arrElements);
        // concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
        array = array.concat(arrElements);
      }
      //   给array添加一个属性，这个属性存着旧的要返回的对象
      array.oldApi = this;
      return jQuery(array);
    },

    end() {
      return this.oldApi;
    },
  };
};
