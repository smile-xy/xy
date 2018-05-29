// nav stop

$(window).scroll(function () {
    var value = $(this).scrollTop() > 400;
    if (value) {
        $('#headNav').addClass('navbar-fixed-top');
    } else {
        $('#headNav').removeClass('navbar-fixed-top')
    }
});