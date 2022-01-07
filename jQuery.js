window.jQuery = function (selectorOrArray) {
  //   const elements = document.querySelectorAll(selectorOrArray);
  //   // 这部分就是重载
  let elements;
  //   console.log(selectorOrArray);
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray);
    // console.log(elements);

    // 如果是数组函数构造的实例
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray; //保持其数组
    // console.log(elements);
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
    oldApi: selectorOrArray.oldApi, // 也就是this.oldApi
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
      array.oldApi = this; // this就是旧的api对象。给数组提供了一个新的属性，这个属性就是旧的api对象，也就是旧的this
      console.log(array);

      // 这一步操作是为了进行链式操作，这里是让elements变成了数组，可以进行数组操作
      const newApi = jQuery(array);
      return newApi;
    },

    end() {
      return this.oldApi; // this就是新的 api
    },

    // 遍历
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      //   记住要return this，不然无法链式操作
      return this;
    },

    print() {
      console.log(elements);
      return this;
    },

    parent() {
      const array = [];

      //  调用这个对象中的each方法，而each方法是遍历elements，所以node就是elements中的一个，然后对其进行判断，它如果不存在父节点
      this.each((node) => {
        // indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
        // 如果数组中没有node.parentNode，那么就将其push到array里，如果已经存在了，那么就不再push。这里的作用是，如果几个节点拥有相同的父节点，除了第一次push之外，其他的节点就不用再将其父元素重复push了
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

    before(beforeNode, selector) {
      selector.parentNode.insertBefore(beforeNode, selector);
      return this;
    },

    after()
  };
};
