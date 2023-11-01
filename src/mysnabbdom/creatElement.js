// 真正创建节点,将vnode 创建为DOM，不进行插入  就是将虚拟dom对象身上的 东西 赋值给真正的DOM
export default function createElement(vnode) {
  //   debugger;
  //   console.log("目的是吧虚拟节点", vnode);
  //   创建一个DOM节点，这个节点还是孤儿节点    真实DOM的节点  这一步非常重要的
  let domNode = document.createElement(vnode.sel);
  // 有字节点还是有文本
  if (
    vnode.text != "" &&
    (vnode.children == undefined || vnode.children.length == 0)
  ) {
    // 它内部是文字  赋值给 真实DOM文本内容
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归创建子节点
    // 它内部是子节点，就要递归创建节点
    for (let i = 0; i < vnode.children.length; i++) {
      // 得到当前这个children
      let ch = vnode.children[i];
      // 创建出它的DOM，一但调用createElement意味着：创建出了DOM了，
      // 并且它的elm属性指向了创建出的DOM，但是没有上树是一个孤儿节点
      let chDOM = createElement(ch); //这里拿的是 createElement的返回值
      console.log(chDOM); // 经过createElment 递归将children里面的Vnode 变为 DOM
      // 上树
      domNode.appendChild(chDOM); //domNode 相当于ul 添加字节点
    }
  }
  // 补充elm属性
  vnode.elm = domNode;
  //   console.log(domNode);
  //   返回elm，elm属性是一个纯dom对象
  console.log(vnode.elm);
  return vnode.elm;
}
