// cookie

var manageCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this;
    },
    removeCookie: function (name) {
        return this.setCookie(name, '', -1);
    },
    printCoolie: function (name) {
        var allCookieArr = document.cookie.split('; ');
        for (var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if (itemCookieArr[0] === name) {
                return itemCookieArr[1];
            } else {
                return undefined;
            }
        }
    },
    hasCookie: function (name) {
        if (this.printCoolie(name) !== 'undefined') {
            return true;
        } else {
            return false;
        }
    }
};
(function () {
    var oDate = new Date();
    var userId = oDate.getTime();
    var userIdTime = oDate.setFullYear(2025);
    var statusTime = oDate.setDate(oDate.getDate() + 7);
    manageCookie.removeCookie('status');
    manageCookie.setCookie('status', 'vip', statusTime); // 上次登录时间
    if (manageCookie.hasCookie('userId') === false) {
        manageCookie.setCookie('userId', userId, userIdTime); // id
    }
}());

// 登录

(function () {
    var status = manageCookie.printCoolie('status');
    var userId = manageCookie.printCoolie('userId');
    var toggle = true;
    var value = status + '&' + userId;
    $('#login-btn').on('click', function () {
        if (toggle) {
            var str = ' <div class="alert-box">\
        <span class="alert-close"></span>\
        <iframe src="QQlogin.html#'+ value + '" frameborder="0"  scrolling="no"></iframe>\
        </div>';
            $('body').append(str);
            toggle = false;
            $('.alert-close').on('click', function () {
                $('.alert-box').css('display', 'none');
            });
        } else {
            $('.alert-box').css('display', 'block');
        }
    });
}());

// 搜索

$('.input-box input').on('focus', function () {
    $(this).animate({ width: '200' }, 600, 'linear');
    $('.input-box input').on('blur', function () {
        if ($('.input-box label').css('display') == 'block' || $('.input-box input').val() == '') {
            $(this).animate({ width: '50' }, 600, 'linear');
        }
    });
});

$('.search-btn').click(function () {
    var str = 'https://www.baidu.com/s?wd=' + $('.input-box input').val();
    clearInput();
    window.open(str);
});

$('.input-box input').on('input', function () {
    var value = $(this).val();
    var oScript = document.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=doJson';
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
});

function doJson(data) {
    var arr = data.s;
    var str = '';
    if (arr.length > 0) {
        arr.forEach(function (elem, index) {
            if (index < 5) {
                str += '<li><a href="https://www.baidu.com/s?wd=' + elem + '" target="_block">' + elem + '</a></li>';
            }
        });
        $('.search-line').html(str);
        $('.search-line>li').click(function () {
            clearInput();
        });
        $('.search-line').css('display', 'block');
        $('.input-box label').css('display', 'none');
    } else {
        $('.search-line').css('display', 'none');
        if ($('.input-box input').val() != '') {
            $('.input-box label').css('display', 'none');
        } else {
            $('.search-line').html('');
            $('.search-line').css('display', 'none');
            $('.input-box label').css('display', 'block');
        }
    }
}
function clearInput() {
    $('.input-box input').val('');
    $('.search-line').html('');
    $('.search-line').css('display', 'none');
    $('.input-box label').css('display', 'block');
    $('.input-box input').blur();
}

// get More
$('#getMore').click(function () {
    ajaxFun('GET', 'projectLine.json', '', showTable, true);
});
function ajaxFun(method, url, data, callback, flag) {
    var xhr = new XMLHttpRequest();

    method = method.toUpperCase();
    if (method === 'GET') {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();

    } else if (method === 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            }
        }
    }
}
function showTable(date) {
    var value = JSON.parse(date);
    var str = '';
    value.forEach(function (elem, index) {
        str += '<div id="table-section" class="table-section">\
                     <div class="table-tittle">'+ elem.title + '</div>\
                     <div class="table-main">\
                         <a href="'+ elem.link + '"><img src="' + elem.imgUrl + '"></a>\
                         <div class="table-article">'+ elem.article + '</div>\
                    </div>\
                 </div>';
    });
    $('.content').html(str);
}

$('#content').on('mouseenter', '.table-main', function () {
    var _this = $(this);
    $(this).children('.table-article').animate({ top: '9em' }, 300, 'swing', () => {
        _this.on('mouseleave', function () {
            _this.children('.table-article').animate({ top: '13em' }, 300, 'linear');
        });
    });
});