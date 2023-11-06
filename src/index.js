import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";
// 老节点
const myVnode1 = h("section", {}, [
  h("h1", { key: "a" }, "A1"),
  h("h1", { key: "b" }, "B1"),
  h("h1", { key: "C" }, "C1"),
  h("h1", { key: "D" }, "D1"),
]);
// 新节点
const myVnode2 = h("section", {}, [
  h("h1", { key: "ttt" }, "ttt"),
  h("h1", { key: "b" }, "B1"),
  h("h1", { key: "C" }, "C1"),
  h("h1", { key: "qqq" }, "qqq"),
  h("h1", { key: "a" }, "A1"),
  h("h1", { key: "kkk" }, "kkk"),
]);
const container = document.querySelector("#container");
// 第一次上树
patch(container, myVnode1);
const btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
  patch(myVnode1, myVnode2);
});
