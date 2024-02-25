class DynamicAdaptive {
	constructor(element, moveToElement, breakpoint, addClassNameOnShuffle, position = 'last', width = 'min') {
		this.sourceElement = document.querySelector(element);
		this.moveToElement = moveToElement;
		this.position = position;
		this.breakpoint = breakpoint;
		this.width = width;
		this.originalIndex = this.indexInParent();
		this.originalParent = this.sourceElement.parentNode;
		this.destination = document.querySelector(this.moveToElement);
		this.addClassNameOnShuffle = addClassNameOnShuffle;
		this.change = false
	}

	indexInParent() {
		return Array.from(this.sourceElement.parentNode.children).indexOf(this.sourceElement);
	}

	moveToElementDestination() {
		const actualIndex = this.position === 'last' ? -1 : 0;
		this.destination.insertBefore(this.sourceElement, this.destination.children[actualIndex]);
		this.addClassNameOnShuffle && this.sourceElement.classList.add(this.addClassNameOnShuffle);
		this.change = true;
	}

	moveBackToOriginal() {
		this.originalParent.insertBefore(this.sourceElement, this.originalParent.children[this.originalIndex]);
		this.addClassNameOnShuffle && this.sourceElement.classList.remove(this.addClassNameOnShuffle);
		this.change = false;
	}

	returnToOriginalPosition() {
		this.change && this.moveBackToOriginal();
	}

	applyMediaQuery(mediaQuery) {
		mediaQuery.matches ? !this.change && this.moveToElementDestination() : this.returnToOriginalPosition();
	}
}
export default class DynamicAdaptiveElement {
	constructor(elements) {
		this.elements = elements.map((element) => {
			return new DynamicAdaptive(
				element.sourceElement,
				element.moveToElement,
				element.breakpoint,
				element.addClassNameOnShuffle,
				element.position,
				element.width
			)
		});
		this.matchMediaList = this.elements.map((el) => {
			return window.matchMedia(`(${el.width}-width: ${el.breakpoint}px)`)
		});
		this.matchMediaList.forEach((media, index) =>{
			return media.addEventListener("change", () => this.elements[index].applyMediaQuery(media))
		});
		this.init();
	}

	init() {
		this.elements.forEach((element) => {
			return element.applyMediaQuery(this.matchMediaList[this.elements.indexOf(element)])
		});
	}
}

// usage
// const elementsData = [
// 	{ sourceElement: 'element', moveToElement: 'box', addClassNameOnShuffle: 'active', position: 'last', breakpoint: 768, width: 'max' },
// ];

// const dynamicAdaptInstance = new DynamicAdaptiveElement(elementsData);