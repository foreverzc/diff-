import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
// 创建patch函数（diff核心函数）
var patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点;
const myVnodel1 = h(
  "a",
  {
    props: {
      href: "http://www.atguigu.com",
      target: "_blank",
    },
  },
  "尚硅谷"
);

const myVnodel2 = h(
  "div",
  {
    class: {
      box: true,
      box2: true,
    },
  },
  "我是一个盒子"
);

const myVnodel3 = h("ul", {}, [
  h("li", "苹果"),
  h("li", "香蕉"),
  h("li", {}, [
    "你好",
    h("div", { class: { box: true } }, "我是梨1"),
    h("div", { class: { box1: true } }, "我是梨2"),
  ]),
  h("li", "葡萄"),
]);

// 让虚拟节点上树  patch 上树  一个容器只能让一个虚拟节点上树
const constainer = document.querySelector("#container");
// 第一个参数放
// patch(constainer, myVnodel1);
// patch(constainer, myVnodel2);
patch(constainer, myVnodel3);
