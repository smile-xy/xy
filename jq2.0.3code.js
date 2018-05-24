jQuery.fn = jQuery.prototpye = {
    jQuery: '版本',
    constructor: '修正指向问题',
    'init()': '初始化和参数管理',
    selector: '存储选择字符串',
    length: 'this对象的长度',
    'toArray()': '转数组',
    'get()': '转原生集合',
    'pushStack()': 'JQ对象的入栈',
    'each()': '遍历集合',
    'ready()': 'DOM加载接口',
    'slice()': '集合的截取',
    'first()': '集合第一项',
    'last()': '集合最后一项',
    'eq()': '集合指定项',
    'map()': '返回新集合',
    'end()': '返回集合前一个状态',
    'push()': '(内部)',
    'sort()': '(内部)',
    'splice()': '(内部)'
}

jQuery.extend = jQuery.fn.extend = function () {
    var some = '定义一些变量';
    if (true) {
        // 是否深度克隆
    }
    if (true) {
        // 参数是否正确
    }
    if (true) {
        // 是不是插件的情况
    }
    for (; ;) {
        // 可能有多个对象的情况
        if (true) {
            // 防止循环引用
        }
        if (true) {
            // 深度克隆
        } else if (true) {
            // 浅克隆
        }
    }
}

jQuery.extend({
    expando: '生成唯一JQ字符串(内部)',
    'noConflict()': '防止冲突',
    isReady: 'DOM是否加载完毕(内部)',
    readyWait: '等待多少文件的局初期(内部)',
    'holdReady()': '推迟DOM触发',
    'isFunction()': '是否为函数',
    'isArray()': '是否为数组',
    'isWindow()': '是否为window',
    'isNumeric()': '是否为数字',
    'type()': '判断数据类型',
    'isPlainObject()': '是否为对象自变量',
    'isEmptyObject()': '是否为空对象',
    'error()': '抛出异常',
    'parseHTML()': '解析节点',
    'parseJSON()': '解析JSON',
    'parseXML()': '解析XML',
    'noop()': '空函数',
    'globalEval()': '全局解析JS',
    'camelCase()': '转驼峰',
    'nodeName': '是否为指定节点名(内部)',
    'each()': '遍历集合',
    'trim()': '去前后空格',
    'makeArray()': '类数组转真数组',
    'inArray()': '数组版indexOf',
    'merge()': '合并数组',
    'grep()': '过滤新数组',
    'map()': '映射新数组',
    guid: '唯一标识符(内部)',
    'proxy()': '改this指向',
    'access()': '多功能值操作(内部)',
    'now()': '当前时间',
    'swap()': 'CSS交换(内部)'
});

jQuery.ready.promise = function () {
    // 检测DOM的异步操作(内部)
};

function isArraylike() {
    // 类似数组的判断(内部)
};

(function (window, undefined) {
    // Sizzle CSS Selector
})(window);

jQuery.Callbacks = function( options ) {
    // 回调对象
}