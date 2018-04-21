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

// insertAfter()，功能类似insertBefore()
// Element.prototype.insertAfter = function(node, index) {
//     var beforeNode = index.nextElementSibling;
//     if (beforeNode == null) {
//         this.appendChild(node);
//     } else {
//         this.insertBefore(node, beforeNode);
//     }
// }

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

// 获取当前滚动条滚动距离
// X轴距离 getScrollOffset().xOffset
// X轴距离 getScrollOffset().yOffset
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            xOffset: window.pageXOffset,
            yOffset: window.pageYOffset
        }
    } else {
        return {
            xOffset: document.body.scrollLeft + document.documentElement.scrollLeft,
            yOffset: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
};

// 获取 elem元素的prop 属性的最终计算结果并返回
function getElementStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
};

/* 事件处理工具
 * 事件绑定 EventTool.addHandler(elem, type, handler)
 * 获取事件对象 EventTool.getEvent(event)
 * 获取事件源对象 EventTool.getTarget(event)
 * 获取相关元素 EventTool.getRelatedTarget(event)
 * 获取鼠标事件触发按钮 EventTool.getClickButton(event)
 * 取消默认事件 EventTool.preventDefault(event)
 * 取消捕获或冒泡 EventTool.stopPropagation(event)
 * 删除事件 EventTool.removeHandler(elem, type, handler)
 *
 * 事件绑定 (解决了IE this指向 window 的BUG 但是IE的事件是匿名函数无法取消)
 *          EventTool.addHandlerFixIeThis(elem, type, handler)
 */
var EventTool = {
    // 事件绑定
    addHandler: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, handler)
        } else {
            elem['on' + type] = handler;
        }
    },
    // 获取事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    // 获取事件源对象
    getTarget: function (event) {
        event = EventTool.getEvent(event);
        return event.target || event.srcElement;
    },
    // 获取相关元素
    getRelatedTarget: function(event){
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if(event.toElement){
            return event.toElement;
        } else if(event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    },
    // 获取鼠标事件触发按钮
    getClickButton: function (event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        }else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    // 取消默认事件
    preventDefault: function (event) {
        event = EventTool.getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 取消捕获或冒泡
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // 删除事件
    removeHandler: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler)
        } else {
            elem['on' + type] = null;
        }
    },
    // 事件绑定 (解决了IE this指向 window 的BUG 但是IE的事件是匿名函数无法取消)
    addHandlerFixIeThis: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, function () {
                handler.call(elem);
            })
        } else {
            elem['on' + type] = handler;
        }
    },
    // 获取按键的字符编码
    // 字符编码转字符 string.fromCharCode()
    getCharCode: function (event) {
        if (typeof event.charCode == 'number') {
            return event.charCode;
        } else{
            return event.keyCode;
        }
    }
}

//元素拖拽
function dragElement(elemId) {
    var divX,
        divY,
        elem = document.getElementById(elemId);
    EventTool.addHandler(elem, 'mousedown', function (event) {
        var event = event || window.event;
        divX = event.clientX - parseInt(getElementStyle(elem, 'left'));
        divY = event.clientY - parseInt(getElementStyle(elem, 'top'));
        EventTool.addHandler(document, 'mousemove', mouseMove);
        EventTool.addHandler(document, 'mouseup', mouseUp);
        EventTool.stopPropagation(event);
        EventTool.preventDefault(event);
    });
    function mouseMove(event) {
        var event = event || window.event;
        elem.style.left = event.clientX - divX + 'px';
        elem.style.top = event.clientY - divY + 'px';
    }
    function mouseUp(event) {
        var event = event || window.event;
        EventTool.removeHandler(document, 'mousemove', mouseMove);
        EventTool.removeHandler(document, 'mouseup', mouseUp);
    }
}