import Burger from "./librarys/burger.js";
import Popup from "./librarys/popup.js";
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import Tabs from "./librarys/tabs.js";

const burger = new Burger("header", {
	breakpoint: 0,
	fixed: {
		defaultValue: true,
	},
})

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

const frame = document.querySelector('.contact__iframe');

var iframeDocument = frame.contentDocument || frame.contentWindow.document;
console.log(iframeDocument);