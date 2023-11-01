import vnode from "./vnode.js";

// 编写一个低配版本的h函数，这个函数碧玺接受3个参数，缺一不可  原版一个两个三个 都行
// 相当于重载功能较弱
// 也就是说调用的时候必须是下面的三种之一
// 形态1 h('div',{},'文字')
// 形态2 h('div',{},[])
// 形态3 h('div',{},h())
export default function (sel, data, c) {
  // 检查参数个数
  if (arguments.length != 3) {
    throw new Error("对不起,h函数必须传入3个参数,我们是低配版的h函数");
  }
  //检查参数c的类型
  if (typeof c == "string" || typeof c == " number") {
    // 说明现在调用h函数时形态1
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 说明现在调用h函数时形态2
    // 遍历c
    let children = [];
    for (let i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象，如果不满足
      if (!(typeof c[i] == "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("传入的数组参数中有项的结果不是h函数");
      } else {
        // 这里不用执行c[i],因为测试语句中已经有了执行
        // 此时只需要收集好就可以了
        children.push(c[i]);
      }
    }
    // 循环结束，children收集完毕 此时可以返回虚拟节点return
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c == "object" && c.hasOwnProperty("sel")) {
    // 说明现在调用函数是形态3
    // 说明传入的c是唯一的children,不用执行c 因为测试语句中已经执行了c 相当于再次调用h函数
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("传入的第三个参数类型不对");
  }
}
