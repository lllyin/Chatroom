/**
 * 作者:ling
 * 创建时间:2017/9/9
 * 描述：用于处理dom的一个小型js库
 */

(function (window) {
    lyin = {};

    //添加节点类名
    lyin.addClass = function ( dom, className ) {
        var domClassName = dom.getAttribute("class");
        if(!this.validClassName(dom,className)){
            domClassName += " "+className;
            dom.setAttribute("class" , domClassName)
        }else{
            console.log(className+"类名以存在")
        }
    }

    //移除节点类名
    lyin.removeClass = function ( dom, className ) {
        var domClassName = dom.getAttribute("class");
        if(this.validClassName(dom,className)){
            var patt = new RegExp(className);
            domClassName = domClassName.replace(patt,"");
            dom.setAttribute("class" , this.trim(domClassName))
        }else{
            console.log(className+"类名不存在")
        }
    }

    //验证类名是否存在
    lyin.validClassName = function ( dom, className ) {
        var _thisClassName= dom.getAttribute("class");
        var className = this.trim(className);
        var patt = new RegExp(className);
        if(patt.test(_thisClassName)){
            return true;
        }else{
            return false
        }
    }

    //去掉前后空格
    lyin.trim = function ( str ) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    window.lyin = lyin;
})(window)




/**
 * 作者:ling
 * 创建时间:2017/9/9
 * 描述：用于处理dom的一个小型js库
 */