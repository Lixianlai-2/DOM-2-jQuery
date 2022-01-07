// 测试find
// jQuery(".test").addClass("red");

// 进行链式操作
jQuery(".test")
  .find(".tt")
  .addClass("red")
  .end()
  .addClass("yellow")
  .each((element) => console.log(element));
// 然后又返回，给test增加class
// jQuery(".test").addClass("green");
