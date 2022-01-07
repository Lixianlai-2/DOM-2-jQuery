// 测试find
// jQuery(".test").addClass("red");

// ------------------------------------------------------------
// 进行链式操作
// jQuery(".test")
//   .find(".tt")
//   .addClass("red")
//   .end()
//   .addClass("yellow")
//   .each((element) => console.log(element));
// 然后又返回，给test增加class
// jQuery(".test").addClass("green");

// const test = jQuery(".test");

// const array = [];

// ------------------------------------------------------------
// 测试孩子
// jQuery(".tt").each((node) => {
//   //   if (array.indexOf(node.parentNode) === -1) {
//   //     array.push(node.parentNode);
//   //   }
//   console.log(node.parentNode);
//   console.log(node);
// });

// 测试print
// jQuery(".test").print();
// jQuery(".第一个test").print();

// ------------------------------------------------------------
// 测试兄弟姐妹
// jQuery(".test").each((node) => {
//   // jQuery(".第一个test").each((node) => {
//   let siblingArr = [];
//   let allChildren = node.parentNode.children;
//   console.log(allChildren);

//   for (let i = 0; i < allChildren.length; i++) {
//     // 当子节点不等于node时，放入siblingArr数组中
//     if (allChildren[i] !== node) {
//       siblingArr.push(allChildren[i]);
//     }
//   }
//   console.log(siblingArr);
//   //   return jQuery(siblingArr);
// });

// jQuery(".t1").siblings();
// ------------------------------------------------------------
// 测试index
// jQuery(".t1").each((node) => {
//   const list = node.parentNode.children;
//   let i;
//   for (i = 0; i < list.length; i++) {
//     if (list[i] === node) {
//       break;
//     }
//   }
//   console.log(i);
//   return i;
// });
// jQuery(".t1").index().addClass("red");

// ------------------------------------------------------------
// 测试before
// jQuery(".t1").each((node) => {
//   node.parentNode.insertBefore(beforeNode, selector);
//   return this;
// });

// $("#test").find(".child").addClass("red");

// ------------------------------------------------------------
// 测试nextSibling
// jQuery(".t1").before("t2", "t1");
