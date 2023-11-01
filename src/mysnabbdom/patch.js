import vnode from "./vnode";
import creatElement from "./creatElement";
export default function (oldVnode, newVnode) {
  //   console.dir(oldVnode);
  console.log(oldVnode);
  // 判断传入的第一个参数,是DOM节点还是虚拟节点  用sel看是否为虚拟节点
  if (oldVnode.sel == "" || oldVnode.sel == undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    // oldVnode.tagName 是 大写的标签需要转换为小写
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
    console.log(oldVnode);
  }

  //判断oldVnode,newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    console.log("是同一个节点");
  } else {
    console.log("不是同一个节点，暴力插入新的删除旧的");
    let newVnodeElm = creatElement(newVnode);
    // 插入到老节点之前
    // 在某个元素之前插入一个新的元素；第一个参数表示要插入的节点，第二参数表示在哪个节点之前插入
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
