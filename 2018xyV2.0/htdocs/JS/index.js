(function () {
    var toTopToggle = true;

    // nav stop
    $(window).scroll(function () {
        var value = $(this).scrollTop() > 400;
        if (value) {
            $('#navPlaceholder').removeClass('nav-placeholder-active');
            $('#toTop').addClass('to-top-active');
            $('#headNav').addClass('navbar-fixed-top');
        } else {
            $('#navPlaceholder').addClass('nav-placeholder-active');
            $('#toTop').removeClass('to-top-active');
            $('#headNav').removeClass('navbar-fixed-top')
        }
    });

    // to top
    $('#toTop').click(function () {
        event.preventDefault();
        if (toTopToggle) {
            toTopToggle = false;
            // pc
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 800, 'linear', () => { toTopToggle = true });
                return false;
            };
            // mobile
            if ($('body').scrollTop()) {
                $('body').animate({ scrollTop: 0 }, 800, 'linear', () => { toTopToggle = true });
                return false;
            }
        }
    });



}())