/**
 * 功能：显示元素
 * @param ele
 * @return {*|}
 */
function show(ele){
    return ele.style.display = "block";
}

/**
 * 功能：隐藏元素
 * @param ele
 * @return {*|}
 */
function hide(ele) {
    return ele.style.display = "none";
}

/**
 * 功能：延迟隐藏
 * @param ele
 * @returns {*}
 */

 function timeoutHide(ele) {
     setTimeout(function(){
         hide(ele);
     }, 2000);
 };

// 运动框架
function animate(ele, json, fn) {
    clearInterval(ele.timer);

    ele.timer = setInterval(function(){
        var bool = true;
        for(var k in json) {
            var leader;
            if(k === "opacity") {
                leader = getStyle(ele, k)*100 || 1;
            }else {
                leader = parseInt(getStyle(ele, k)) || 0;
            }
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if(k === "opacity") {
                ele.style[k] = leader/100;
                ele.style.filter = "alpha(opacity="+leader+")";
            }else if(k === "zIndex"){
                ele.style.zIndex = json[k];
            }else {
                ele.style[k] = leader + "px";
            }
            if(json[k] !== leader){
                bool = false;
            }
        }
        if(bool){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }
    }, 50);
}

// 获取样式
function getStyle(ele, attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(ele, null)[attr];
    }else {
        return ele.currentStyle[attr];
    }
}