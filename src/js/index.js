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

const lazyImages = document.querySelectorAll('[data-src]');
const observerLazyLoad = new IntersectionObserver(entries => {
  entries.forEach(entri => {
    if (entri.isIntersecting) {
			entri.target.setAttribute('src', entri.target.dataset.src)
			entri.target.style.transition = '0.3s opacity ease 0s'
      // entri.target.src = entri.target.dataset.src
      entri.target.style.opacity = '0.3'
      entri.target.addEventListener('load', function () {
        setTimeout(() => {
          // if () {
            entri.target.style.opacity = '1'
          // }
        }, 300);
      })
      observerLazyLoad.unobserve(entri.target)
    }
  })
}, {
  rootMargin: '0px 0px 100px 0px',
  threshold: 0,
})

lazyImages.forEach(img => {
  observerLazyLoad.observe(img);
});
