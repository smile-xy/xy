// TODO: 方法

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

// 异步加载
function asyncLoading(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) { // IE
        script.onreadystatechange = function () {
            if (script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
            }
        }
    } else { // W3C
        EventTool.addHandler(window, function () {
            callback();
        });
    }
    script.src = url;
    document.head.appendChild(script);
}

// insertAfter()，功能类似insertBefore()
Element.prototype.insertAfter = function (node, index) {
    var beforeNode = index.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(node);
    } else {
        this.insertBefore(node, beforeNode);
    }
}

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

// 获取 elem 元素的prop 属性的最终计算结果并返回
function getElementStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
};

// 获取 elem 元素的prop 属性的最终计算结果并返回
function getElementStyleNum(elem, prop) {
    return parseInt(getElementStyle(elem, prop));
};

// 兼容性获取className （个人感觉没什么用）
Document.prototype.getByClassName = function (className) {

    var domArr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0);
    var filterArr = [];

    function dealClass(elem) {
        var reg = /\s+/g;
        var arrClassName = elem.className.replace(reg, ' ').trim();
        return arrClassName;
    }

    domArr.forEach(function (elem, index) {
        var itemClassArr = dealClass(elem).split(' ');
        for (let i = 0; i < itemClassArr.length; i++) {
            if (itemClassArr[i] === className) {
                filterArr.push(elem);
                break;
            }
        }
    })
    return filterArr;
}

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
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    // 获取鼠标事件触发按钮
    getClickButton: function (event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button;
        } else {
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
        } else {
            return event.keyCode;
        }
    }
}

// TODO: 框架

//元素鼠标拖拽、碰撞运动
function dragElementFrame(elemId, canDrag, canMove) {
    var divX,
        divY,
        timer,
        speedX = 0,
        speedY = 0,
        distanceX,
        distanceY,
        elemNewTop,
        elemNewLeft,
        elemLastTop,
        elemLastLeft,
        elemDrag = canDrag || true, // 默认可以拖拽
        elemMove = canMove || false, // 默认不能碰撞运动
        elem = document.getElementById(elemId);
    elemLastTop = elem.offsetTop;
    elemLastLeft = elem.offsetLeft;

    if (elemDrag) {
        EventTool.addHandler(elem, 'mousedown', function (event) {
            var event = event || window.event;
            // 元素碰撞运动
            if (canMove) {
                distanceX = event.clientX - elem.offsetLeft;
                distanceY = event.clientY - elem.offsetTop;
            }

            divX = event.clientX - getElementStyleNum(elem, 'left');
            divY = event.clientY - getElementStyleNum(elem, 'top');

            EventTool.addHandler(document, 'mousemove', mouseMove);
            EventTool.addHandler(document, 'mouseup', mouseUp);

            EventTool.stopPropagation(event);
            EventTool.preventDefault(event);
        });
    }

    function mouseMove(event) {
        var event = event || window.event;
        elem.style.left = event.clientX - divX + 'px';
        elem.style.top = event.clientY - divY + 'px';

        // 元素碰撞运动
        if (canMove) {
            clearInterval(elem.timer);
            elemNewLeft = event.clientX - distanceX;
            elemNewTop = event.clientY - distanceY;

            speedX = elemNewLeft - elemLastLeft;
            speedY = elemNewTop - elemLastTop;

            elemLastTop = elemNewTop;
            elemLastLeft = elemNewLeft;
        }
    }

    function mouseUp(event) {
        var event = event || window.event;
        EventTool.removeHandler(document, 'mousemove', mouseMove);
        EventTool.removeHandler(document, 'mouseup', mouseUp);
        if (elemMove) {
            startElementMove(elem, speedX, speedY);
        }
    }

    function startElementMove(elem, speedX, speedY) {
        clearInterval(elem.timer);
        var g = 6, // 重力，垂直方向速度增加量
            u = 0.9, // 摩擦力，各个方向速度衰减比例
            numTimes = 1.3; // 速度放大倍数

        speedX *= numTimes;
        speedY *= numTimes;

        elem.timer = setInterval(function () {
            // 垂直方向模仿重力加速度
            speedY += g;

            // 移动后Y位置
            var newTop = elem.offsetTop + speedY,
                // 窗口top到元素top距离
                distanceTop = getPageSize().pageHeight - getElementStyleNum(elem, 'height'),
                // 移动后X位置
                newLeft = elem.offsetLeft + speedX,
                // 窗口left到元素left距离
                distanceLeft = getPageSize().pageWidth - getElementStyleNum(elem, 'width');


            // 上边界碰撞
            if (newTop <= 0) {
                newTop = 0;
                speedY *= -1; // 反向速度
            }
            // 右边界碰撞
            if (newLeft >= distanceLeft) {
                newLeft = distanceLeft;
                speedX *= -1; // 反向速度
            }
            // 下边界碰撞
            if (newTop >= distanceTop) {
                newTop = distanceTop;
                speedY *= -1; // 反向速度
            }
            // 左边界碰撞
            if (newLeft <= 0) {
                newLeft = 0;
                speedX *= -1; // 反向速度
            }
            // 速度衰减
            speedX *= u;
            speedY *= u;

            // 强制速度绝对值小于1的时候等于0
            if (Math.abs(speedX) < 1) {
                speedX = 0;
            }
            if (Math.abs(speedY) < 1) {
                speedY = 0;
            }

            // 速度等于0并且落地停止
            if (speedX == 0 && speedY == 0 && newTop == distanceTop) {
                clearInterval(elem.timer);
            }
            elem.style.top = newTop + 'px';
            elem.style.left = newLeft + 'px';
        }, 30);
    }
}

// 多物体多值链式运动框架
function chainMotionFrame(elem, objAttr, callback) {
    // 执行前清除计时器
    clearInterval(elem.timer);
    var timer,
        speed,
        getStyle,
        attrOpacity,
        isComplete;
    // 对opacity保存副本并乘100以便计算
    if (objAttr.opacity) {
        attrOpacity = objAttr.opacity;
        objAttr.opacity = objAttr.opacity * 100;
    }

    elem.timer = setInterval(function () {
        isComplete = true;
        for (var key in objAttr) {
            // 获取当前元素样式
            if (key == 'opacity') {
                getStyle = parseFloat(getElementStyle(elem, key)) * 100;
            } else {
                getStyle = parseFloat(getElementStyle(elem, key));
            }

            // 减速运动
            speed = (objAttr[key] - getStyle) / 7;
            // 速度区间 [1,n)
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (key == 'opacity') {
                elem.style.opacity = (getStyle + speed) / 100;
            } else {
                elem.style[key] = getStyle + speed + 'px';
            }

            // 全部运动执行完毕前等于false
            if (getStyle != objAttr[key]) {
                isComplete = false;
            }
        }
        // 清除计时器，恢复修改数据，执行回调函数
        if (isComplete) {
            clearInterval(elem.timer);
            objAttr.opacity = attrOpacity;
            typeof callback === 'function' ? callback() : false;
        }
    }, 30);
}

// 轮播图生成框架 需要同时引用turnPageFrame.css文件
HTMLDivElement.prototype.createTurnPageFrame = function (turnTime, imgSrcArr, mapWidth, mapHeight) {
    var index = 0,
        canMove = true,
        sliderLen = imgSrcArr.length,
        li,
        img,
        span,
        timer,
        leftBtn,
        rightBtn,
        sliderPage,
        sliderIndex,
        sliderIndexChild;
    this.className += ' turnPageFrame';
    this.appendChild(createMap());
    sliderIndexChild = sliderIndex.children;
    // 左右按钮事件
    leftBtn.onclick = function () {
        autoMove('left');
    };
    rightBtn.onclick = function () {
        autoMove('right');
    };

    for (var i = 0; i < sliderLen; i++) {
        (function (myIndex) {
            sliderIndexChild[i].onclick = function () {
                canMove = false;
                clearTimeout(timer);
                index = myIndex;
                chainMotionFrame(sliderPage, { left: - index * mapWidth }, function () {
                    timer = setTimeout(autoMove, turnTime);
                    changeIndex(index);
                    canMove = true;
                });
            }
        }(i));
    }

    function createMap() {
        var fragment = document.createDocumentFragment();

        // 轮播图li创建
        sliderPage = document.createElement('ul');
        sliderPage.className = 'slider-page';
        sliderPage.style.width = mapWidth * (sliderLen + 1) + 'px';
        sliderPage.style.height = mapHeight + 'px';

        for (var i = 0; i <= sliderLen; i++) {
            li = document.createElement('li');
            li.style.width = mapWidth + 'px';
            img = document.createElement('img');
            if (i < sliderLen) {
                img.src = imgSrcArr[i];
            } else {
                img.src = imgSrcArr[0];
            }
            li.appendChild(img);
            sliderPage.appendChild(li);
        }
        fragment.appendChild(sliderPage);
        // 左右按钮
        leftBtn = document.createElement('div');
        leftBtn.className = 'btn left-btn';
        leftBtn.innerHTML = '&lt;';
        rightBtn = document.createElement('div');
        rightBtn.className = 'btn right-btn';
        rightBtn.innerHTML = '&gt;';
        fragment.appendChild(leftBtn);
        fragment.appendChild(rightBtn);

        // 底部定位点
        sliderIndex = document.createElement('div');
        sliderIndex.className = 'slider-index';
        for (i = 0; i < sliderLen; i++) {
            span = document.createElement('span');
            sliderIndex.appendChild(span);
        }
        fragment.appendChild(sliderIndex);

        return fragment;
    }

    function autoMove(direction) {
        if (canMove) {
            canMove = false;
            clearTimeout(timer);
            if (!direction || direction == 'right') {
                index++;
                chainMotionFrame(sliderPage, { left: sliderPage.offsetLeft - mapWidth }, function () {
                    if (sliderPage.offsetLeft == -sliderLen * mapWidth) {
                        index = 0;
                        sliderPage.style.left = 0;
                    }
                    timer = setTimeout(autoMove, turnTime);
                    canMove = true;
                    changeIndex(index);
                });

            } else if (direction == 'left') {
                if (sliderPage.offsetLeft == 0) {
                    sliderPage.style.left = - sliderLen * mapWidth + 'px';
                    index = sliderLen;
                }
                index--;
                chainMotionFrame(sliderPage, { left: sliderPage.offsetLeft + mapWidth }, function () {
                    timer = setTimeout(autoMove, turnTime);
                    changeIndex(index);
                    canMove = true;
                });
            }
        }
    }

    function changeIndex(_index) {
        for (var i = 0; i < sliderLen; i++) {
            sliderIndexChild[i].className = '';
        }
        sliderIndexChild[_index].className = 'active';
    }
    timer = setTimeout(autoMove, turnTime);
}