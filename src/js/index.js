import smoothscroll from 'smoothscroll-polyfill';
import Burger from "./librarys/burger.js";
import Popup from "./librarys/popup.js";
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import Tabs from "./librarys/tabs.js";
import DynamicAdaptiveElement from './librarys/dinamicAdaptiveElement.js';

smoothscroll.polyfill();

const burger = new Burger("header", {
	breakpoint: 0,
	fixed: {
		defaultValue: true,
	},
})

document.documentElement.style.setProperty('--header-height', burger.header.offsetHeight + 'px')

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

const lazyImages = document.querySelectorAll('[data-src], [data-srcset]');
const observerLazyLoad = new IntersectionObserver(entries => {
	entries.forEach(entri => {
		if (entri.isIntersecting) {
			if (entri.target.hasAttribute('data-srcset')) {
				entri.target.setAttribute('srcset', entri.target.dataset.srcset)
			} else if (entri.target.hasAttribute('data-src')) {
				entri.target.setAttribute('src', entri.target.dataset.src)
			}

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
	document.querySelectorAll('.swiper-button-next').forEach(item => {
		if (item.closest('.tabs__panel_active')) {
			item.click()
		}
	})
})

document.querySelector('.blog__buttons-nav-slider_prev').addEventListener('click', function () {
	document.querySelectorAll('.swiper-button-prev').forEach(item => {
		if (item.closest('.tabs__panel_active')) {
			item.click()
		}
	})
})

const elementsData = [
	{ sourceElement: '.blog__buttons-nav-slider-box', moveToElement: '.blog__tabs-content', addClassNameOnShuffle: 'active', position: 'last', breakpoint: 576, width: 'max' },
];

const dynamicAdaptInstance = new DynamicAdaptiveElement(elementsData);