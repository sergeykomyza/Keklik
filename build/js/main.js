// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLICK TOGGLE
const clickToggle = (wrap) => {
    document.querySelector(wrap).addEventListener('click', function(e){
        const clickElem = e.target.closest('.js-clickElem')
        const parentElem = clickElem.closest('.js-clickParent')
        if(clickElem){
            parentElem.classList.toggle('is-active')
        }
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.js-slider', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.js-catalogNav',
            clickable: true
        },
        navigation: {
            nextEl: '.products-arrows .js-next',
            prevEl: '.products-arrows .js-prev',
        },
        breakpoints: {
            993: {
                slidesPerView: 4
            },
            769: {
                slidesPerView: 3
            }
        }
    });
    const swiper2 = new Swiper('.js-sliderPreview', {
        loop: false,
        slidesPerView: 1,
        pagination: {
            el: '.js-previewSmallNav',
            clickable: true
        },
    });
    const swiper3 = new Swiper('.js-sliderVideo', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.js-previewVideoNav',
            clickable: true
        },
        breakpoints: {
            993: {
                slidesPerView: 5
            },
            769: {
                slidesPerView: 4
            }
        }
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
sliders()
clickToggle('.footer')

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
ymaps.ready(init);

function init(){

    var myMap = new ymaps.Map("map", {
        center: [56.745981, 37.179787],
        zoom: 13,
        controls: ['smallMapDefaultSet']
    }, {
        searchControlProvider: 'yandex#search'
    });

    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point"
        },
    });
    myMap.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([56.745981, 37.179787], {
            balloonContent: '<strong></strong>',
            iconCaption: 'М.О., г. Королев, ул. Ленина 12'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '200'
        }));

    myMap.setType('yandex#publicMap');
    // отключаем масштабирование скроллом       
    myMap.behaviors.disable('scrollZoom');
    // на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
        
}
*/
