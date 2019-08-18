//滚动条的js
//conObj 文字对象
//滚动条的对象
//滑块的对象
function dragScroll(conObj, scrollObj, dragObj) {
//   滑动区域的height
    var conHeight = conObj.scrollHeight;
    //滑动区域 的可视高度
    var h = conObj.clientHeight;
    //滑块的移动高度
    var maxTop = scrollObj.offsetHeight - dragObj.offsetHeight;
//    移动的比例
    var num = ((conHeight - h) / maxTop);
//    滑块的拖动
    dragObj.onmousedown = function (e) {
        var ev = event || e;
        var y = ev.clientY - dragObj.offsetTop;
        scrollObj.onmousemove = function (ev) {
            var ev = event || ev;
            var endY = ev.clientY - y;
            endY = (endY >= maxTop) ? maxTop : ((endY <= 0) ? 0 : endY);
            dragObj.style.top = endY + 'px';
            //文字滚动事件的实现
            conObj.scrollTop = endY * num;
        }
        scrollObj.onmouseup = function (ev2) {
            scrollObj.onmousemove = null;
        }
        return false;
    }
}
