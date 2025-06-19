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

const burger = (wrap) => {
    const menuToggle = document.querySelector(wrap)
    menuToggle.addEventListener('click', function(){
        this.closest(wrap).classList.toggle('is-active')
    })
}
const catalogMenu = () => {
    const desktopCatalogBtnOpen = document.querySelector('.js-toggleCatalog')
    desktopCatalogBtnOpen.addEventListener('click', function(){
        document.querySelector('.header-catalog').classList.toggle('is-active')
        this.querySelector('.js-burger').classList.toggle('is-active')
    })

    const desktopCatalogItem = document.querySelectorAll('.header-catalog__item')
    desktopCatalogItem.forEach(item => {
        item.addEventListener('mouseover', function(){
            desktopCatalogItem.forEach(elem => {
                elem.classList.remove('is-active')
            })
            this.classList.add('is-active')
        })
    })
    const openMobileMenuBtn = document.querySelector('.js-openMobileMenu')
    openMobileMenuBtn.addEventListener('click', function(){
        document.querySelector('.header-catalog').classList.toggle('is-active')
    })
    const closeMobileMenuBtn = document.querySelector('.js-closeMobileMenu')
    closeMobileMenuBtn.addEventListener('click', function(){
        document.querySelector('.header-catalog').classList.remove('is-active')
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const input = document.querySelector("#phone");
window.intlTelInput(input, {
    initialCountry: "ru",
    nationalMode: true,
    strictMode: true,
    loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLICK TOGGLE
const clickToggle = (wrap) => {
    if(document.querySelector(wrap)){
        document.querySelector(wrap).addEventListener('click', function(e){
            const clickElem = e.target.closest('.js-clickElem')
            if(clickElem){
                const parentElem = clickElem.closest('.js-clickParent')
                if(parentElem){
                    parentElem.classList.toggle('is-active')
                }
            } 
        })
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CART BUTTON
const inCartBtn = () => {
    document.querySelectorAll('.js-incartToggle').forEach(item => {
        console.log(item)
        item.addEventListener('click', function(e){
            e.target.closest('.js-incartToggle').classList.toggle('is-active')
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SEARCH
const search = () => {
    const open = document.querySelector('.js-openSearchInputBox')
    const close = document.querySelector('.js-closeSearchInputBox')
    open.addEventListener('click', function(){
        document.querySelector('.search__inputbox').classList.add('is-active')
    })
    close.addEventListener('click', function(){
        document.querySelector('.search__inputbox').classList.remove('is-active')
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MOBILE FILTER
const mobileFilter = () => {
    const btnOpen = document.querySelector('.js-mobileFilterOpen')
    const btnClose = document.querySelector('.js-mobileFilterClose')
    const mobileFilter = document.querySelector('.mobile-filters')
    btnOpen?.addEventListener('click', function(){
        mobileFilter?.classList.add('is-active')
    })
    btnClose?.addEventListener('click', function(){
        mobileFilter?.classList.remove('is-active')
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TABS
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
  function hideContent(){
    content.forEach(item => {
      item.style.display = 'none';
    });
    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showContent(i){
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);
  }
  header.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if( target &&
            (target.classList.contains(tabSelector.replace(/\./,"")) ||  target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
            tab.forEach((item, i) => {
                if(target == item || target.parentNode == item){
                    hideContent();
                    showContent(i);
                }
            });
        }
  });
  hideContent();
  showContent(0); 
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    for(let i = 1; i <= 4; i++){
        const swiper = new Swiper(`.js-slider${i}`, {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: `.js-catalogNav${i}`,
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
    }
    const swiper = new Swiper(`.js-slider`, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: `.js-catalogNav`,
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
        navigation: {
          nextEl: '.video-arrows .js-next',
          prevEl: '.video-arrows .js-prev',
        },
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
    let sliderSelector = '.js-sliderPresent'
    let sliderSelectorOptions = {
        loop: false,
        speed:1000,
        parallax:true,
        // autoplay:{
        //   delay:5000
        // },
        grabCursor: true,
        navigation: {
          nextEl: '.js-presentNext',
          prevEl: '.js-presentPrev',
        },
        pagination: {
            el: '.js-presentNav',
            clickable: true
        }
    };
    let sliderEvents = new Swiper(sliderSelector, sliderSelectorOptions);
    const swiper4 = new Swiper(`.js-slider`, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: `.js-blogNav`,
            clickable: true
        },
        navigation: {
            nextEl: '.blog-arrows .js-next',
            prevEl: '.blog-arrows .js-prev',
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
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RANGE PRICE
const rangePrice = () => {
    document.querySelectorAll('.js-price').forEach( item => {
        const minSlider = item.querySelector(".range.min");
        const maxSlider = item.querySelector(".range.max");
        const minValueInput = item.querySelector("#min-value");
        const maxValueInput = item.querySelector("#max-value");
        const minInput = item.querySelector("#min-price");
        const maxInput = item.querySelector("#max-price");
        minInput.value = minSlider.value;
        maxInput.value = maxSlider.value;
        function updateValues() {
            minValueInput.value = minSlider.value;
            maxValueInput.value = maxSlider.value;
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                minSlider.value = maxSlider.value;
            }
        }
        function dinamicRangeTrack(){
            const trackLine = item.querySelector('.range-track')
            const sliderLeft = minSlider.offsetLeft
            const container = minSlider.parentElement
            const containerWidth = container.offsetWidth
            const minLeft = parseInt(minSlider.min)
            const maxLeft = parseInt(minSlider.max)
            const valueLeft = parseInt(minSlider.value)
            const percentLeft = (valueLeft - minLeft) / (maxLeft - minLeft)
            const thumbPositionLeft = sliderLeft + percentLeft * minSlider.offsetWidth
            // console.log('от левого ползунка: ', thumbPositionLeft + 'px')
            const sliderRight = maxSlider.offsetLeft
            const minRight = parseInt(maxSlider.min)
            const maxRight = parseInt(maxSlider.max)
            const valueRight = parseInt(maxSlider.value)
            const percentRight = (valueRight - minRight) / (maxRight - minRight)
            const thumbPositionRight = sliderRight + percentRight * maxSlider.offsetWidth
            // console.log('от правого ползунка: ', thumbPositionRight + 'px')
            // console.log(containerWidth)
            trackLine.style.left = thumbPositionLeft + 'px'
            trackLine.style.width = thumbPositionRight - thumbPositionLeft + 'px'
        }
        minValueInput.addEventListener('input', () => {
            minSlider.value = minValueInput.value
            dinamicRangeTrack()
        })
        maxValueInput.addEventListener('input', () => {
            maxSlider.value = maxValueInput.value
            dinamicRangeTrack()
        })
        minSlider.addEventListener("input", () => {
            dinamicRangeTrack()
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            updateValues();
        });
        maxSlider.addEventListener("input", () => {
            dinamicRangeTrack()
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                minSlider.value = maxSlider.value;
            }
            updateValues();
        });
        dinamicRangeTrack()
        updateValues();
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ INIT
if(document.documentElement.clientWidth > 768){
    burger('.js-openMobileMenu')
}
burger('.js-toggleCatalog')
catalogMenu()
sliders()
search()
if(document.querySelector('.js-clickElem')){
    clickToggle('.footer')
    clickToggle('.mobile-pagemenu')
    clickToggle('.mobile-catalog')
    clickToggle('.tags')
    clickToggle('.filters')
    clickToggle('.mobile-filters')
}
if(document.querySelector('.js-tabs')){
    tabs('.js-tabs', '.js-tab', '.js-tabBody', 'is-active')
}
if(document.querySelector('.range-price')){
    rangePrice()
}
if(document.querySelector('.js-incartToggle')){
    inCartBtn()
}
mobileFilter()

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
