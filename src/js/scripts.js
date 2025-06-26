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
		const faqTitle = document.querySelector('.faq-accordion__title');

		if (faqTitle) {
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

});