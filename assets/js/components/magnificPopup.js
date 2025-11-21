$(function () {
    // $('.template1__image').magnificPopup({
    //     delegate: 'a.gallery-item', // внутри контейнера
    //     type: 'image',
    //     gallery: {
    //         enabled: true,        // включаем галерею
    //         navigateByImgClick: true,
    //         preload: [0, 1]       // загрузка текущей и следующей картинки
    //     },
    //     removalDelay: 200,
    //     mainClass: 'mfp-fade'
    // });


    Fancybox.bind("[data-fancybox='gallery']", {
        Thumbs: {
            autoStart: true, // миниатюры сразу открываются снизу
        },
    });

});



