document.addEventListener('DOMContentLoaded', function () {

	// Скрипт для инпута с прикреплением файла. Показываем название прикрепленного файла
	function fileInputFn() {
		const fileInput = document.querySelector('.file-input');
		const fileInputText = document.querySelector('.form__file-btn-text');

		if (fileInput && fileInputText) {
			fileInput.addEventListener('change', function () {
				let filename = this.files[0].name;
				fileInputText.innerText = filename;
			});
		}
	};

	fileInputFn();

	// Для меню .aside-nav__list в мобильной версии формируем выпадающее меню
	function asideNavFn() {
		const asideNavList = document.querySelector('.aside-nav__list'); // десктопное меню
		const asideNavItemActive = document.querySelector('.aside-nav__item.active'); // активный пункт десктопного меню
		const asideNavMob = document.querySelector('.aside-nav-mob'); // мобильное меню
		const darkPageAside = document.querySelector('.dark-page__aside'); // куда вставим меню

		function asideNavInit() {
			if (asideNavList && asideNavItemActive) {
				// Создаем мобильное меню
				const mobMenu = document.createElement('div');
				mobMenu.classList.add('aside-nav-mob');
				darkPageAside.prepend(mobMenu);

				// Делаем обертку для остальных пунктов
				const asideNavMobBtnList = document.createElement('div');
				asideNavMobBtnList.classList.add('aside-nav-mob__list');
				mobMenu.append(asideNavMobBtnList);

				const items = document.querySelectorAll('.aside-nav__item');
				items.forEach(function (item) {
					if (item.classList.contains('active')) {
						// Делаем кнопку
						const btnText = item.firstElementChild.innerText;
						const asideNavMobBtn = document.createElement('div');
						asideNavMobBtn.classList.add('aside-nav-mob__btn');
						asideNavMobBtn.innerText = btnText;
						mobMenu.prepend(asideNavMobBtn);
					} else {
						// Делаем обертку для остальных пунктов
						const asideNavMobLink = item.firstElementChild.cloneNode(true);
						asideNavMobLink.className = '';
						asideNavMobLink.classList.add('aside-nav__link');
						asideNavMobBtnList.append(asideNavMobLink);
					};
				});
			}
		};

		function asideNavDestroy() {
			const asideNavMob = document.querySelector('.aside-nav-mob'); // мобильное меню
			if (asideNavMob) {
				asideNavMob.remove();
			}
		};

		function checkWidthViewport() {
			const widthViewport = document.documentElement.clientWidth;
			if (widthViewport <= 768) {
				checkAsideNav();
			} else {
				asideNavDestroy();
			}
		};

		function checkAsideNav() {
			const asideNavMob = document.querySelector('.aside-nav-mob'); // мобильное меню
			if (asideNavMob) {
				return;
			} else {
				asideNavInit();
			}
		};

		function asideNavToggle(e) {
			const element = e.target;
			if (element.classList.contains('aside-nav-mob__btn')) {
				element.classList.toggle('toggle');
				element.nextElementSibling.classList.toggle('toggle');
			}
		};

		checkWidthViewport();
		window.addEventListener('resize', checkWidthViewport);
		document.addEventListener('click', asideNavToggle);
	};

	asideNavFn();
	window.addEventListener('resize', asideNavFn);

	// Скрипт аккордеон для вопросов-ответов
	function accordionFn() {
		const accordionTitle = document.querySelector('.faq-accordion__title');

		if (accordionTitle) {
			function accordionItemToggleFn(e) {
				const element = e.target;
				if (element.classList.contains('faq-accordion__title')) {
					const parentEl = element.parentElement;
					parentEl.classList.toggle('toggle');
					const descrEl = parentEl.querySelector('.faq-accordion__descr');
					if (parentEl.classList.contains('toggle')) {
						const elementHeight = descrEl.scrollHeight + 62;
						descrEl.style.maxHeight = `${elementHeight}px`;
						descrEl.style.padding = '22px 16px 40px';
					} else {
						descrEl.style.maxHeight = '';
						descrEl.style.padding = '0 16px';
					}
				}
			};
			document.addEventListener('click', accordionItemToggleFn);
		}
	};

	accordionFn();

	// Инициализация слайдеров на странице контактов
	function photoSliderInit() {
		if ((document.querySelector('.adress-block')) && (document.querySelector('.js-sliderPhoto'))) {
			
			document.querySelectorAll('.adress-block').forEach(n => {
				const photoSlider = new Swiper(n.querySelector('.js-sliderPhoto'), {
					loop: false,
					slidesPerView: 3,
					spaceBetween: 10,
					navigation: {
						nextEl: n.querySelector('.photo-arrows .js-next'),
						prevEl: n.querySelector('.photo-arrows .js-prev'),
					},
					pagination: {
						el: n.querySelector('.js-previewPhotoNav'),
						clickable: true
					},
				});
			});
		}
	};

	photoSliderInit();

	// Табы. Параметры: класс для кнопок табов и класс содержимого табов
	const tabsToggle = function (tabBtnClass, tabContentClass) {

		if (document.querySelector(tabBtnClass)) {
			const tabsBtn = document.querySelectorAll(tabBtnClass); // все кнопки табов
			const tabsContent = document.querySelectorAll(tabContentClass); // все содержимое табов

			// Перебираем кнопки табов, по которым можем щелкнуть
			tabsBtn.forEach(function (btn, index) {

				// Вешаем событие клика на каждую кнопку
				btn.addEventListener('click', function () {

					// у всех кнопок одного родителя убрать класс активности
					tabsBtn[index].parentNode.querySelectorAll(tabBtnClass).forEach(function (element) {
						element.classList.remove('is-active');
					});

					// у кнопки, по которой щелкнули, добавить класс активности
					tabsBtn[index].classList.add('is-active');

					// у каждого содержимого одного родителя удалить класс активности
					tabsContent[index].parentNode.querySelectorAll(tabContentClass).forEach(function (element) {
						element.classList.remove('is-active');
					});

					// у содержимого с этим индексом добавить класс активности
					tabsContent[index].classList.add('is-active');

				});

			});

		};
	};

	tabsToggle('.js-tabs__btns .tags__item', '.tabs-content__item');


});