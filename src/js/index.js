import Burger from "./librarys/burger.js";
import Popup from "./librarys/popup.js";
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import Tabs from "./librarys/tabs.js";
import DynamicAdaptiveElement from './librarys/dinamicAdaptiveElement.js';

const burger = new Burger("header", {
	breakpoint: 0,
	fixed: {
		defaultValue: true,
	},
})


const resizeObserver = new ResizeObserver((entries) => {
	entries.forEach(entri => {
		if (entri.contentRect) {
			document.documentElement.style.setProperty('--burger-header-height', document.querySelector('.header').offsetHeight + 'px');
			document.documentElement.style.setProperty('--header-height', document.querySelector('.header').offsetHeight)
		}
	})
})

resizeObserver.observe(document.querySelector('.header'))

// scroll onclick


const getGotoLink = (e) => {
	const link = e.target.closest('[data-goto]')
	if (link) {
		link.dataset.goto = link?.getAttribute('href')
		if (document.querySelector(link.dataset.goto)) {
			const gotoBlock = document.querySelector(link.dataset.goto);
			const gotoBlockValue = gotoBlock?.getBoundingClientRect().top + scrollY - getComputedStyle(document.documentElement).getPropertyValue('--header-height');

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}

	}
}
document.addEventListener('click', getGotoLink);

const popup = new Popup();

const slider = new Swiper('.blog__slider', {
	modules: [Navigation],
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	spaceBetween: '20px',

	breakpoints: {
		576: {
			slidesPerView: 2
		},

		992: {
			slidesPerView: 3
		},

		1200: {
			slidesPerView: 4
		}
	}
});

const tabs = new Tabs('tab1', {
	firstTabActive: true,
})

const lazyImages = document.querySelectorAll('[data-src]');
const observerLazyLoad = new IntersectionObserver(entries => {
	entries.forEach(entri => {
		if (entri.isIntersecting) {
			entri.target.setAttribute('src', entri.target.dataset.src)
			entri.target.style.transition = '0.3s opacity ease 0s'
			entri.target.style.opacity = '0.3'
			entri.target.addEventListener('load', function () {
				setTimeout(() => {
					entri.target.style.opacity = '1'
					observerLazyLoad.unobserve(entri.target)
				}, 300);
			})

		}
	})
}, {
	rootMargin: '0px 0px 100px 0px',
	threshold: 0,
})

lazyImages.forEach(img => {
	observerLazyLoad.observe(img);
});


document.querySelector('.blog__buttons-nav-slider_next').addEventListener('click', function () {
	this.closest('.blog__tabs').querySelectorAll('.swiper-button-next').forEach(item => {
		if (item.closest('.tabs__panel_active')) {
			item.click()
		}
	})
})

document.querySelector('.blog__buttons-nav-slider_prev').addEventListener('click', function () {
	this.closest('.blog__tabs').querySelectorAll('.swiper-button-prev').forEach(item => {
		if (item.closest('.tabs__panel_active')) {
			item.click()
		}
	})
})

const elementsData = [
	{ sourceElement: '.blog__buttons-nav-slider-box', moveToElement: '.blog__tabs-content', addClassNameOnShuffle: 'active', position: 'last', breakpoint: 576, width: 'max' },
];

const dynamicAdaptInstance = new DynamicAdaptiveElement(elementsData);

// const trainersList = document.querySelector(".swiper-wrapper");
// const trainersDescr = document.querySelectorAll('.blog__slide-text');
// trainersDescr.forEach(descrEl => {
//     descrEl.setAttribute('aria-hidden', 'true')
// });

// trainersList?.addEventListener('mouseover', (event) => {
//     const item = event.target.closest('.blog__slide');
//     const descr = item?.querySelector('.blog__slide-text');
//     const itemLink = item?.querySelector('.blog__slide-link');
//     const heightTrainersItemLink = itemLink?.scrollHeight;
//     if (item) {
//         descr.setAttribute('aria-hidden', 'false')
//     }
//     item?.style.setProperty('--height-trainers-descr', `${-descr.scrollHeight - 25}px`);
//     if (descr?.scrollHeight >= 200) {
//         item?.style.setProperty('--height-trainers-descr', `-${heightTrainersItemLink + (item.scrollHeight / 2)}px`);
//     }
// });

// trainersList?.addEventListener('mouseout', (event) => {
//     const item = event.target.closest('.blog__slide');
//     const descr = item?.querySelector('.blog__slide-text');
//     descr?.setAttribute('aria-hidden', 'true')
//     if (item) {
//         descr.setAttribute('aria-hidden', 'true')
//     }
// });


const resizeObserverSlide = new ResizeObserver((entries) => {
	entries.forEach(entri => {
		if (entri.contentRect) {
			if (entri.target.classList.contains('team__person-descr')) {
				entri.target.style.setProperty('--descr-text-height', entri.target.scrollHeight + 'px');
			}
			if (entri.target.classList.contains('blog__slide-text')) {
				entri.target.style.setProperty('--slide-text-height', entri.target.scrollHeight + 'px');
			}
		}
	})
})



document.querySelectorAll('.blog__slide-text').forEach(item => resizeObserverSlide.observe(item))
document.querySelectorAll('.team__person-descr').forEach(item => resizeObserverSlide.observe(item))


const blogSection = document.querySelector('.blog');

blogSection.addEventListener('click', function (event) {
	if (window.matchMedia('(pointer: coarse)').matches) {
		if (event.target.closest('.blog__slide')) {
			event.target.closest('.blog__slide').classList.toggle('blog__slide_active');
			
		}
	}
})