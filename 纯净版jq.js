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

    print() {
      console.log(elements);
    },

    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      //   记住要return this，不然无法链式操作
      return this;
    },

    print() {
      console.log(selectorOrArray);
    },

    parent() {
      const array = [];
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          // push之后,array里面就是父元素了
          array.push(node.parentNode);
        }
      });
      return jQuery(array);
    },

    children() {
      const array = [];
      this.each((node) => {
        //   ...是展开运算符，将数组中的内容单独拿出来
        array.push(...node.children);
      });
      return jQuery(array);
    },

    siblings() {
      let siblingArr = [];

      this.each((node) => {
        let allChildren = node.parentNode.children;
        // console.log(allChildren);
        for (let i = 0; i < allChildren.length; i++) {
          // 当子节点不等于node时，放入siblingArr数组中
          if (allChildren[i] !== node) {
            // console.log(allChildren[i]);
            siblingArr.push(allChildren[i]);
          }
        }
      });
      console.log(siblingArr);
      return jQuery(siblingArr);
    },

    index() {
      let i;
      this.each((node) => {
        const list = node.parentNode.children;

        for (i = 0; i < list.length; i++) {
          if (list[i] === node) {
            break;
          }
        }
        console.log(i);
      });
      return this;
    },
  };
};
