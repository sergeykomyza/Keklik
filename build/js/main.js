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
if(document.querySelector('.js-phone')){
    const input = document.querySelectorAll(".js-phone");
    const russianNames = {
        'ru': 'Россия',
        'us': 'США',
        'gb': 'Великобритания',
        'de': 'Германия',
        'fr': 'Франция',
        'cn': 'Китай',
        'jp': 'Япония'
        // Добавьте другие страны по необходимости
    };
    input.forEach(item => {
        const iti = window.intlTelInput(item, {
            initialCountry: "ru",
            nationalMode: true,
            strictMode: true,
            loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
            customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                // Пример: заменяем все цифры на "x"
                return selectedCountryPlaceholder.replace(/\d/g, 'x');
                // Или можно на нули:
                // return selectedCountryPlaceholder.replace(/\d/g, '0')
                // Или на подчёркивания:
                // return selectedCountryPlaceholder.replace(/\d/g, '_');
            },
            localizedCountries: russianNames
        });
        
        // Простой хак для перевода после загрузки
        setTimeout(() => {
            const dropdownItems = document.querySelectorAll('.iti__country-name');
            dropdownItems.forEach(el => {
                const code = el.closest('.iti__country')?.dataset?.countryCode;
                if(code && russianNames[code]) {
                    el.textContent = russianNames[code];
                }
            });
        }, 1000);
    })
}
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
            if(clickElem?.innerText === 'Читать полностью'){
                clickElem.innerText = 'Свернуть'
            } else if(clickElem?.innerText === 'Свернуть'){
                clickElem.innerText = 'Читать полностью'
            }
        })
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CART BUTTON
const inCartBtn = () => {
    document.querySelectorAll('.js-incartToggle').forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            e.target.closest('.js-incartToggle').classList.toggle('is-active')
            const innerBtnText = e.target.closest('.js-incartToggle').querySelector('span')
            if(innerBtnText?.innerText === 'В корзину'){
                innerBtnText.innerText = 'В корзине'
            }
            else if(innerBtnText?.innerText === 'В корзине'){
                innerBtnText.innerText = 'В корзину'
            }
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
                nextEl: `.products-arrows .js-next${i}`,
                prevEl: `.products-arrows .js-prev${i}`,
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
    const swiper5 = new Swiper(`.js-sliderPopular`, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: `.js-catalogNav`,
            clickable: true
        },
        navigation: {
            nextEl: '.popular-arrows .js-next',
            prevEl: '.popular-arrows .js-prev',
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
    document.querySelectorAll('.js-sliderPreview').forEach(item => {
        const swiper2 = new Swiper(item, {
            loop: false,
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            pagination: {
                el: '.js-previewSmallNav',
                clickable: true
            },
        });
        item.addEventListener('mouseenter', () => {
            swiper2.autoplay.start();
        });
        item.addEventListener('mouseleave', () => {
            swiper2.autoplay.stop();
        });
    })
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
    const swiper6 = new Swiper(`.js-sliderProduct`, {
        enabled: true,
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: `.js-previewProductNav`,
            clickable: true
        },
        breakpoints: {
            566: {
                enabled: false,
                spaceBetween: 0,
            },
        }
    });
    const swiper7 = new Swiper(`.js-sliderReviews`, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.reviews-arrows .js-next',
            prevEl: '.reviews-arrows .js-prev',
        },
        pagination: {
            el: `.js-reviewsNav`,
            clickable: true
        },
        breakpoints: {
            993: {
                slidesPerView: 3,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    const swiper8 = new Swiper(`.js-sliderFastview`, {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: `.js-previewSmallNav`,
            clickable: true
        },
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLICK THIS TOGGLE
const clickThisToggle = (elem) => {
    const elems = document.querySelectorAll(elem)
    elems.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            if(item.closest(elem)){
                item.classList.toggle('is-active')
            }
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POPUP
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
    const popupBtn = document.querySelectorAll("[data-popup='popup']")
    popup.forEach(item => {
      item.addEventListener('click', function(e){
        let itsBody = e.target == item.querySelector('.popup__body') || item.querySelector('.popup__body').contains(e.target)
        let itsClose = e.target.closest('.js-popupClose')
        if(!itsBody || itsClose){
          item.querySelector('.popup__body').classList.remove('animate__zoomIn')
          item.querySelector('.popup__body').classList.add('animate__zoomOut')
          setTimeout(()=> {
            item.classList.remove('is-open')
          },500)
        }
      })
    })
    popupBtn.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src')
            document.documentElement.classList.add('popup-open')
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.add('animate__zoomIn')
            document.querySelector(hrefPopupBtn).querySelector('.popup__body').classList.remove('animate__zoomOut')
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SCROLL IN PRODUCT PAGE
const scrollSticky = () => {
    const rightSide = document.querySelector('.js-scrollSticky');
    if (!rightSide) {
      console.warn("Элемент .js-scrollSticky не найден");
      return;
    }
    
    const rightSideOffsetTop = rightSide.offsetTop;
    const rightSideHeight = rightSide.clientHeight;
    const windowHeight = window.innerHeight;
    const diff = rightSideHeight - windowHeight;
    
    let lastScrollY = window.scrollY;
    let currentTop = 120; // текущее значение top
    
    // Минимальное значение top (-diff), если контент больше окна
    const minTop = rightSideHeight > windowHeight ? -diff : 120;
    
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
    
      // Обновляем размеры при ресайзе (если нужно)
      const newWindowHeight = window.innerHeight;
      const newRightSideHeight = rightSide.clientHeight;
      const visibleArea = newWindowHeight - 20;
      const newDiff = newRightSideHeight - visibleArea;
      const newMinTop = newRightSideHeight > visibleArea ? -newDiff : 120;
    
      // Только если контент больше высоты экрана
      if (newRightSideHeight > newWindowHeight) {
        if (currentScrollY > lastScrollY) {
          // Скроллим вниз
          currentTop = Math.max(
            newMinTop,
            currentTop - (currentScrollY - lastScrollY)
          );
        } else if (currentScrollY < lastScrollY) {
          // Скроллим вверх
          currentTop = Math.min(
            120,
            currentTop + (lastScrollY - currentScrollY)
          );
        }
    
        // Применяем стили
        rightSide.style.position = 'sticky';
        rightSide.style.top = `${currentTop}px`;
      }
    
      lastScrollY = currentScrollY;
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VIDEO
const video = () => {
    document.querySelectorAll('.js-videoParent').forEach(wrapper => {
        const video = wrapper.querySelector('.preview-videoclip');
        const btn = wrapper.querySelector('.js-videoPlay');
        const btnContent = btn.querySelector('.preview-video__icon')

        btn.addEventListener('click', () => {
            if (video.paused) {
                video.muted = true; // страховка
                video.play()
                .then(() => {
                video.style.cssText = `
                    opacity: 1;
                    z-index: 2;
                `
                btnContent.innerHTML = `<svg width="36" height="36" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="4" height="14"/><rect x="12" y="3" width="4" height="14"/></svg>`;
                })
                .catch(err => {
                console.error('Ошибка запуска видео:', err);
                });
            } else {
            video.pause();
                btnContent.innerHTML = `<svg class="" width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.015 13.6857C30.8155 14.1114 31.4851 14.7469 31.952 15.5241C32.419 16.3012 32.6656 17.1908 32.6656 18.0974C32.6656 19.0041 32.419 19.8936 31.952 20.6708C31.4851 21.4479 30.8155 22.0834 30.015 22.5091L8.66167 34.1208C5.22333 35.9924 1 33.5591 1 29.7108V6.48575C1 2.63575 5.22333 0.204082 8.66167 2.07242L30.015 13.6857Z" stroke="white" stroke-width="2"/></svg>`;
            }
        });
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ В КАРТОЧКЕ ТОВАРА ПЕРЕНОСИМ НАЗВАНИЕ ИЗ ОДНОГО МЕСТА НА ДЕСКТОПЕ В ДРУГОЕ МЕСТО НА МОБИЛКЕ
// Функция для перемещения элемента в другой элемент. Параметры:  что перемещаем, куда перемещаем, способ перемещения
let movingConstructor = function (block, to, metod) {
  if (!(document.querySelector(block) && document.querySelector(to))) {
    // console.log("переноса не будт");
    return;
  } else {
    switch (metod) {
      case "prepend":
        document
          .querySelector(to)
          .prepend(document.querySelector(block));
        break;

      case "before":
        document
          .querySelector(to)
          .before(document.querySelector(block));
        break;

      case "after":
        document
          .querySelector(to)
          .after(document.querySelector(block));
        break;

      default:
        document
          .querySelector(to)
          .append(document.querySelector(block));
        break;
    }
  }
};
// функция будет перемещать блок в указанное место при определенной ширине экрана
let moving = function () {
  const windowWidth = window.innerWidth; // ширина экрана

  if (windowWidth <= 768) {
    movingConstructor(".product__titlebox", ".product__mobiletitlebox", "append");
  } else {
    movingConstructor(".product__titlebox", ".product__infobox", "prepend");
  }
};
moving();
window.addEventListener("resize", moving);

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
    clickToggle('.reviews-slider')
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
clickThisToggle('.infavor')
clickThisToggle('.product__size')
popup()
scrollSticky()
// video()
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
