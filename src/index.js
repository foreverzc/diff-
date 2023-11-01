import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const myVnode2 = h("section", {}, [h("h1", {}, "你好"), h("h1", {}, "你好2")]);
const myVnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, [h("div", {}, "heihei")]),
  h("li", {}, [h("div", {}, "ll"), h("div", {}, "mm")]),
]);
const container = document.querySelector("#container");
// patch(container, myVnode1);
patch(container, myVnode1);

const btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
  patch(myVnode1, myVnode2);
});
