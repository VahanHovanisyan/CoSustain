const lazyImages = document.querySelectorAll('[data-src]');

const observerLazyLoad = new IntersectionObserver(entries => {
	entries.forEach(entri => {
			if (entri.isIntersecting) {
					entri.target.setAttribute('src', entri.target.dataset.src)
					// entri.target.removeAttribute('data-src');
					observerLazyLoad.unobserve(entri.target)
			}
	})
}, {
	rootMargin: '0pc 0px 100px 0px',
	threshold: 0,
})
console.log(observerLazyLoad);
lazyImages.forEach(img => {
	observerLazyLoad.observe(img);
});

export default observerLazyLoad;