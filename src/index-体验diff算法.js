// import h from "./mysnabbdom/h";
import {
  h,
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from "snabbdom";
// 创建patch函数（diff核心函数）
var patch = init([classModule, propsModule, styleModule, eventListenersModule]);

const container = document.querySelector("#container");
const btn = document.querySelector(".btn");
const myVnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);

patch(container, myVnode1);

const myVnode2 = h("ul", {}, [
  h("li", { key: "E" }, "E"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);

btn.addEventListener("click", function () {
  patch(myVnode1, myVnode2);
});
