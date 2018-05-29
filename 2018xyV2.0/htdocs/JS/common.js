// img 预加载

$($('.header').css('background-image', 'url(IMG/bg-01.jpg)'));

// 登录
(function () {
    var remail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    var rpassword = /^[a-zA-Z]\w{5,17}$/;
    var toggle = {
        email: false,
        password: false,
        verifyChar: false
    };

    var oCanvas = document.getElementById('verify');
    var ctx = oCanvas.getContext('2d');
    var w = oCanvas.width;
    var h = oCanvas.height;
    ctx.lineWidth = 4;
    ctx.font = "80px Arial";
    var verifyChar = createCanvas()();

    $('#verify').click(function () {
        ctx.clearRect(0, 0, w, h);
        verifyChar = createCanvas()();
    });

    $('#reset').click(function () {
        console.log('reset');
        $('#myModal').find($('input')).val('');
        $('.form-group').removeClass('has-error').removeClass('has-success');
    });

    $('#inputEmail').on('blur', function () {
        toggle.email = verify.call(this, remail);
        canLogin();
    });

    $('#inputPassword').on('blur', function () {
        toggle.password = verify.call(this, rpassword);
        canLogin();
    });

    $('#inputVerify').on('blur', function () {
        toggle.verifyChar = isVerifyChar.call(this, verifyChar);
        canLogin();
    });

    function canLogin() {
        if (toggle.email && toggle.password && toggle.verifyChar) {
            $('#submit').removeAttr('disabled');

            $('#submit').click(function () {
                console.log('submit');
                $('#submit').attr('disabled', 'disabled').text('loading');
            });

        } else {
            $('#submit').attr('disabled', 'disabled');
        };
    };

    function verify(regExp) {
        var value = regExp.test($(this).val());
        if (value) {
            $(this).parents('.form-group').addClass('has-success').removeClass('has-error');

        } else {
            $(this).parents('.form-group').addClass('has-error').removeClass('has-success');
        }
        return value;
    };

    function isVerifyChar(verifyChar) {
        var value = $(this).val().toLocaleLowerCase() == verifyChar.toLocaleLowerCase();
        if (value) {
            $(this).parents('.form-group').addClass('has-success').removeClass('has-error');
        } else {
            $(this).parents('.form-group').addClass('has-error').removeClass('has-success');
        }
        return value;
    };

    function createCanvas() {
        var str = createVerify(6);
        for (var i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.floor(Math.random() * 500), Math.floor(Math.random() * 200));
            ctx.lineTo(Math.floor(Math.random() * 500), Math.floor(Math.random() * 200));
            ctx.stroke();
            ctx.fillText(str, 0, 120, w);
        };
        return function getVerify() {
            return str;
        };
        // 生成随机验证码
        function createVerify(L) {
            var s = '';
            var randomchar = function () {
                var n = Math.floor(Math.random() * 62);
                if (n < 10) return n; //1-10
                if (n < 36) return String.fromCharCode(n + 55); //A-Z
                return String.fromCharCode(n + 61); //a-z
            }
            while (s.length < L) s += randomchar();
            return s;
        };
    };
}());

// // cookie

// var manageCookie = {
//     setCookie: function (name, value, time) {
//         document.cookie = name + '=' + value + ';max-age=' + time;
//         return this;
//     },
//     removeCookie: function (name) {
//         return this.setCookie(name, '', -1);
//     },
//     printCoolie: function (name) {
//         var allCookieArr = document.cookie.split('; ');
//         for (var i = 0; i < allCookieArr.length; i++) {
//             var itemCookieArr = allCookieArr[i].split('=');
//             if (itemCookieArr[0] === name) {
//                 return itemCookieArr[1];
//             } else {
//                 return undefined;
//             }
//         }
//     },
//     hasCookie: function (name) {
//         if (this.printCoolie(name) !== 'undefined') {
//             return true;
//         } else {
//             return false;
//         }
//     }
// };
// (function () {
//     var oDate = new Date();
//     var userId = oDate.getTime();
//     var userIdTime = oDate.setFullYear(2025);
//     var statusTime = oDate.setDate(oDate.getDate() + 7);
//     manageCookie.removeCookie('status');
//     manageCookie.setCookie('status', 'vip', statusTime); // 上次登录时间
//     if (manageCookie.hasCookie('userId') === false) {
//         manageCookie.setCookie('userId', userId, userIdTime); // id
//     }
// }());

// // 搜索

// $('.input-box input').on('focus', function () {
//     $(this).animate({ width: '200' }, 600, 'linear');
//     $('.input-box input').on('blur', function () {
//         if ($('.input-box label').css('display') == 'block' || $('.input-box input').val() == '') {
//             $(this).animate({ width: '50' }, 600, 'linear');
//         }
//     });
// });

// $('.search-btn').click(function () {
//     var str = 'https://www.baidu.com/s?wd=' + $('.input-box input').val();
//     clearInput();
//     window.open(str);
// });

// $('.input-box input').on('input', function () {
//     var value = $(this).val();
//     var oScript = document.createElement('script');
//     oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=doJson';
//     document.body.appendChild(oScript);
//     document.body.removeChild(oScript);
// });

// function doJson(data) {
//     var arr = data.s;
//     var str = '';
//     if (arr.length > 0) {
//         arr.forEach(function (elem, index) {
//             if (index < 5) {
//                 str += '<li><a href="https://www.baidu.com/s?wd=' + elem + '" target="_block">' + elem + '</a></li>';
//             }
//         });
//         $('.search-line').html(str);
//         $('.search-line>li').click(function () {
//             clearInput();
//         });
//         $('.search-line').css('display', 'block');
//         $('.input-box label').css('display', 'none');
//     } else {
//         $('.search-line').css('display', 'none');
//         if ($('.input-box input').val() != '') {
//             $('.input-box label').css('display', 'none');
//         } else {
//             $('.search-line').html('');
//             $('.search-line').css('display', 'none');
//             $('.input-box label').css('display', 'block');
//         }
//     }
// }
// function clearInput() {
//     $('.input-box input').val('');
//     $('.search-line').html('');
//     $('.search-line').css('display', 'none');
//     $('.input-box label').css('display', 'block');
//     $('.input-box input').blur();
// }