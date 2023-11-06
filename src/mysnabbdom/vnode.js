// 函数 的功能非常简单，就是把传入的5个参数组合成对象，返回
export default function (sel, data, children, text, elm) {
  const key = data.key;
  return {
    sel, // select 选择器 也可以说是标签
    data, //数据
    children,
    text, //内容
    elm,
    key,
  };
}
