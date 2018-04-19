//强化版typeof
function typeIs(target) {
    var typeOfTar = typeof target,
        toStrTar = Object.prototype.toString.call(target),
        value = {
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Number]': 'number - object',
            '[object Boolean]': 'boolean - object',
            '[object String]': 'string - object'
        };

    if (target === null) {
        return 'null';
    } else if (typeOfTar == 'object') {
        return value[toStrTar];
    } else {
        return typeOfTar;
    }
}

//深度克隆
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        isArr = '[object Array]';

    for (var key in origin) {
        if (origin.hasOwnProperty(key)) {

            if (origin[key] !== 'null' && typeof (origin[key]) === 'object') {

                target[key] = (toStr.call(origin[key]) == isArr) ? [] : {};

                deepClone(origin[key], target[key]);
            } else {
                target[key] = origin[key];
            }
        }
    }
    return target;
}

// 继承模型
var inherit = (function () {
    var F = function () { };
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());

// 获取当前窗口大小，并返回对象{pageWidth, pageHeight};
var getPageSize = function () {
    if (window.innerWidth) {
        return {
            pageWidth: window.innerWidth,
            pageHeight: window.innerHeight
        }
    } else {
        if (document.compatMode == 'CSS1Compat') {
            return {
                pageWidth: document.documentElement.clientWidth,
                pageHeight: document.documentElement.clientHeight
            }
        } else {
            return {
                pageWidth: document.body.clientWidth,
                pageHeight: document.body.clientHeight
            }
        }
    }
};

// 获取当前滚动条滚动距离，并返回对象{xOffset, yOffset};
function getScrollOffset(){
        
    if (window.pageXOffset) {
        return {
            xOffset: window.pageXOffset,
            yOffset: window.pageYOffset
        }
    }else {
        return {
            xOffset: document.body.scrollLeft + document.documentElement.scrollLeft,
            yOffset: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
};

// 获取 elem元素的 prop属性的最终显示结果并返回
function getElementStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
};

// 跨浏览器 事件处理方法
var EventTool = {
    addHandler: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, handler)
        } else {
            elem['on' + type] = handler;
        }
    },
    removeHandler: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler)
        } else {
            elem['on' + type] = null;
        }
    },
}

// 跨浏览器 事件绑定 (解决了IE this指向 window 的BUG)
function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else if(elem.attachEvent){
        elem.attachEvent('on' + type, function(){
            handler.call(elem);
        })
    }else {
        elem['on' + type] = handler;
    }
}

// 跨浏览器 取消默认事件
function cancelHandler(event) {
    var event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}