import patchVnode from "./patchVnode";
import createElement from "./creatElement";
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key;
}
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log("sadas", parentElm, oldCh, newCh);
  //   旧前
  let oldStartIdx = 0;
  //   新前
  let newStartIdx = 0;
  //   旧后
  let oldEndIdx = oldCh.length - 1;
  //   新后
  let newEndIdx = newCh.length - 1;
  //   真正的旧前节点
  let oldStartVnode = oldCh[0];
  //   真正的旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  //   真正的新前节点
  let newStartVnode = newCh[0];
  //   真正的新后节点
  let newEndVnode = newCh[newEndIdx];
  //
  let keyMap = null;

  //   console.log(
  //     oldEndIdx,
  //     newEndIdx,
  //     oldStartVnode,
  //     oldEndVnode,
  //     newStartVnode,
  //     newEndVnode
  //   );
  // 开始大while 了
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("※");
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx];
    }
    // 新前与旧前
    else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log("命中1");
      //   patchVnode 比较text并且改变老的节点的内容
      patchVnode(oldStartVnode, newStartVnode);
      // 指针后移
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log("命中2");
      // 新后与旧后
      patchVnode(oldEndVnode, newEndVnode);
      // 指针后移
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      console.log("命中3,移动节点移动到旧后的后面");
      patchVnode(oldStartVnode, newEndVnode);
      //  移动节点
      //  如何插入节点？只要你插入一个已经在DOM树上的节点，他就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      // 新后指针向上  旧后指针向下
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      console.log("命中4,移动节点移动到旧前的前面");
      patchVnode(oldEndVnode, newStartVnode);
      //   移动节点
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 新前指针向下移动  旧后指针向上移动
      // 如何插入节点？只要你插入一个已经在DOM树上的节点，他就会被移动
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 这里对老节点循环是否匹配到新节点 如果匹配到 新的节点下移 而老的节点指针不动
      // 四种命中都没有命中
      if (!keyMap) {
        keyMap = {};
        // 从oldStatrIdx开始，到oldEndIdx结束，创建keyMap 就是为了检测是否有新的项
        // 产生一个映射对象 相当于缓存
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          // console.log(key);
          if (key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      // 寻找当前这项（newStartIdx）这项 在keyMap中映射的位置序号
      const idxInOld = keyMap[newStartVnode.key];
      console.log(idxInOld);
      // 如果idxInOld是一个undefined 意味着他是一个全新的项目
      if (idxInOld == undefined) {
        // 判断，如果idxInOld是undefined 表示他是全新的项
        // 被加入的项是 newStartVnode 是一个虚拟dom 要变成真实DOM才可以
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined，不是全新的项 需要移动
        const elmTomove = oldCh[idxInOld];
        // 判断选择器是否相同
        patchVnode(elmTomove, newStartVnode);
        // 把这项设置为undefined 表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动 调用insertBefore 可以实现移动 移动到oldStartIdx之前也就是oldStartVnode
        parentElm.insertBefore(elmTomove.elm, oldStartVnode.elm);
      }
      // 指针下移，只移动新的头
      newStartVnode = newCh[++newStartIdx];
    }
  }
  //   当while结束之后  是否新增和删除
  //   循环结束 start还是比End小
  if (newStartIdx <= newEndIdx) {
    // 还有剩余节点
    console.log(
      "新的节点还有剩余节点没有处理完",
      "新增",
      "把剩余节点,插如到oldStartIdx之前"
    );
    // 插入的标杆 遍历新的newCh 添加到老的没有处理的之前
    // 原版是before  阉割版 插入的是老的未处理之前
    // const before =newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    // console.log(before);
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore 方法自动识别null，如果null就会自动排到队尾去 和appendChild一致
      // newCh现在还没有真正的DOM需要调用createElement()函数变为DOM
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log(newStartIdx);
    console.log(newEndIdx);
    console.log("old还有剩余节点没有处理完", "删除");
    // 批量删除oldStart和oldEnd
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
