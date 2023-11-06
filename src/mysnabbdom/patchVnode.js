import createElement from "./creatElement";
import updateChildren from "./updateChildren";
// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  //   // 判断新旧Vnode 是否是同一个对象
  if (oldVnode === newVnode) return;
  // 判断newVnode有没有text属性
  if (
    (newVnode.text != undefined && newVnode.children == undefined) ||
    newVnode.children.length == 0
  ) {
    console.log("新vnode有text属性");
    // 新老Vnode 的 text内容是否相同
    if (newVnode.text == oldVnode.text) {
      return;
    } else {
      // 如果新老虚拟节点内容不同，则直接让新的内容写入老的elm中即可 如果老的是children  那么也会立即消失掉
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新的vnode没有text属性 有children属性
    console.log("新vnode没有text属性");
    // 判断老的有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      //老的有children d，此时就是最复杂的情况，新老都有chilren
      console.log("精细化比较");
      console.log(oldVnode.elm);
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老的没有children代表是有text新的有 children
      console.log("老的没有children新的有children");
      // 清空老的节点的内容
      oldVnode.elm.innerText = "";
      // 遍历新的vnode的子节点，创建DOM，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        console.log(1);
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
