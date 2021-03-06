window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  //   const elements = document.querySelectorAll(selectorOrArrayOrTemplate);

  function createHTML(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  //   // 这部分就是重载
  let elements;
  //   console.log(selectorOrArrayOrTemplate);
  if (selectorOrArrayOrTemplate[0] === "<") {
    elements = createHTML(selectorOrArrayOrTemplate);
    console.log(elements);
  } else if (typeof selectorOrArrayOrTemplate === "string") {
    elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    // console.log(elements);

    // 如果是数组函数构造的实例
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate; //保持其数组
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

  // 用Object.create指定原型 让api__proto__ === jQuery.prototype
  // 相当于const api = {__proto__:jQuery.prototype}
  // 这样api就能调用原型中的方法了
  const api = Object.create(jQuery.prototype);

  // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
  // 把下面的第二个参数，也就是那个对象中的内容，分配给api参数
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate,
  });

  return api;
};

// 让jQuery的原型中有下面这些方法
// 让jQuery的fn属性也能调用这些原型中的方法
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,

  jquery: true,

  get(index) {
    return this.elements[index];
  },

  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el));
    }
  },

  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLAllCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    }
  },

  // 在main.js中，如果div.addClass(className).call(div,className)；也相当于div.addClass(className).call(this,className)
  addClass(className) {
    // 函数内操作函数外的elements，这就是闭包
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }

    //   这里return之后，就能再次调用addClass,也就是进行链式操作
    return this;
  },
  //------------------------------------------
  // 下面是查
  //------------------------------------------

  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const arrElements = Array.from(
        this.elements[i].querySelectorAll(selector)
      );
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
    for (let i = 0; i < this.elements.length; i++) {
      //  这里的elements[i]会作为fn的第一个参数
      fn.call(null, this.elements[i], i);
    }
    //   记住要return this，不然无法链式操作
    return this;
  },

  print() {
    console.log(this.elements);
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

  // before(beforeNode, selector) {
  //   this.each((el) => {
  //     if (el === selector) {
  //       el.parentNode.insertBefore(beforeNode, selector);
  //     }
  //     console.log(el);
  //     // console.log(el === selector);
  //   });
  //   return this;
  // },

  // after(nodeNextSiblingPrevious, node) {
  //   node.parentNode.insertBefore(nodeNextSiblingPrevious, node.nextSibling);
  // },

  //------------------------------------------
  // 下面是删
  //------------------------------------------

  remove(child) {
    child.parentNode.removeChild(childNode);

    return this;
  },

  empty(parentNode) {
    const arr = [];

    let x = parentNode.firstChild;

    while (x) {
      arr.push($.remove(parentNode.firstChild));

      x = parentNode.firstChild;
    }

    return this;
  },

  //------------------------------------------
  // 下面是改
  //------------------------------------------
};
