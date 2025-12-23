$(document).on('click', '.btnBack', function (e) {
    e.preventDefault();

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = $('body').data('home');
    }
});
