// toggle mobile menu
document.querySelector('.nav-toggle').addEventListener('click',
    () => document.querySelector('.main-nav-items').classList.toggle('show'));
    
const copyrightYear = document.getElementById('currentYear')
    const footerCopy = new Date().getFullYear()
     copyrightYear.innerText = footerCopy



//  Credit to: https://codepen.io/thefewunshaken/pen/BEBYLd & https://codepen.io/goldigo/pen/YzXogYR?editors=1010 for inspiration and code w/ modification/edits made by Juan Moreno.

let x = 0;

const changeText = () => {
  const phrase = document.querySelector('.top-text-transition');
  const compStyles = window.getComputedStyle(phrase);
  const animation = compStyles.getPropertyValue('animation');
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  
    const phrases = ['We Carry D9, HHC, & CBD Items!', 'FREE Shipping W/ Orders Over $88', 'You must be at least 21 years old to purchase.'];
  
  x = randomNum(x, phrases.length);
  const newPhrase = phrases[x];
  
  setTimeout(() => {
    phrase.textContent = newPhrase;
  }, 600); // time to allow opacity to hit 0 before changing word
}

const randomNum = (num, max) => {
  let i = Math.floor(Math.random() * max);
  
  // ensure diff num every time
  if (num === i) {
    return randomNum(x, max);
  } else {
    return i;
  }
}

const getAnimationTime = () => {
  const phrase = document.querySelector('.top-text-transition');
  const compStyles = window.getComputedStyle(phrase);
  let animation = compStyles.getPropertyValue('animation');
  
  // firefox support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-moz-animation-duration');
  
    // webkit support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-webkit-animation-duration');
  
  
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  return animationTime;
}

changeText();
setInterval(changeText, getAnimationTime());



// Homepage slider

const slider = (function(){
	
	//const
	const slider = document.getElementById("slider"); // define slider
	console.log(slider);
	const sliderContent = document.querySelector(".slider-content"); // get slider-content class
	console.log(sliderContent);
	const sliderWrapper = document.querySelector(".slider-content-wrapper"); 
	const elements = document.querySelectorAll(".slider-content__item"); // get slider-content-item
	const sliderContentControls = createHTMLElement("div", "slider-content__controls"); // create element slider controls
	let dotsWrapper = null; //  dots
	let leftArrow = null; 
	let rightArrow = null;
	let intervalId = null; // setInterval
	
	// data object
    const itemsInfo = {
        // define attributes
		offset: 0, 
		position: {
			current: 0, 
			min: 0, 
			max: elements.length - 1
		},
		intervalSpeed: 2000, // set interval speed

		update: function(value) {
			this.position.current = value;
			this.offset = -value;
		},
		reset: function() {
			this.position.current = 0;
			this.offset = 0;
		}	
	};

	const controlsInfo = {
		buttonsEnabled: false,
		dotsEnabled: false,
	};

	function init(props) {
		// let {buttonsEnabled, dotsEnabled} = controlsInfo;
		let {intervalSpeed, position, offset} = itemsInfo;
		
		
		if (slider && sliderContent && sliderWrapper && elements) {
			
			if (props && props.intervalSpeed) {
				intervalSpeed = props.intervalSpeed;
			}
			if (props && props.currentItem) {
				if ( parseInt(props.currentItem) >= position.min && parseInt(props.currentItem) <= position.max ) {
					position.current = props.currentItem;
					offset = - props.currentItem;	
				}
			}
			if (props && props.buttons) {
				controlsInfo.buttonsEnabled = true;
			}
			if (props && props.dots) {
				controlsInfo.dotsEnabled = true;
			}
			
			_updateControlsInfo();
			_createControls(controlsInfo.dotsEnabled, controlsInfo.buttonsEnabled);
			_render();	
		} else {
			console.log('error');
		}
	}

	// define a function to set control buttons
	function _updateControlsInfo() {
		const {current, min, max} = itemsInfo.position;
		controlsInfo.prevButtonDisabled = current > min ? false : true;
		controlsInfo.nextButtonDisabled = current < max ? false : true;
	}

	function _createControls(dots = false, buttons = false) {
		
		sliderContent.append(sliderContentControls);

		createArrows();
		buttons ? createButtons() : null;
		dots ? createDots() : null;
		
		// define function to set control arrows
		function createArrows() {
			const dValueLeftArrow = "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z";
			const dValueRightArrow = "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z";
			const leftArrowSVG = createSVG(dValueLeftArrow);
			const rightArrowSVG = createSVG(dValueRightArrow);
			
			leftArrow = createHTMLElement("div", "prev-arrow");
			leftArrow.append(leftArrowSVG);
			leftArrow.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current - 1))
			
			rightArrow = createHTMLElement("div", "next-arrow");
			rightArrow.append(rightArrowSVG);
			rightArrow.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current + 1))

			sliderContentControls.append(leftArrow, rightArrow);
			
			// SVG function
			function createSVG(dValue, color="currentColor") {
				const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute("viewBox", "0 0 256 512");
				const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				path.setAttribute("fill", color);
				path.setAttribute("d", dValue);
				svg.appendChild(path);	
				return svg;
			}
		}

		// Dots function
		function createDots() {
			dotsWrapper = createHTMLElement("div", "dots");			
			for(let i = 0; i < itemsInfo.position.max + 1; i++) {
				const dot = document.createElement("div");
				dot.className = "dot";
				dot.addEventListener("click", function() {
					updateItemsInfo(i);
				})
				dotsWrapper.append(dot);		
			}
			sliderContentControls.append(dotsWrapper);	
		}
		
		// Buttons function
		function createButtons() {
			const controlsWrapper = createHTMLElement("div", "slider-controls");
			prevButton = createHTMLElement("button", "prev-control", "Prev");
			prevButton.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current - 1))
			
			autoButton = createHTMLElement("button", "auto-control", "Auto");
			autoButton.addEventListener("click", () => {
				intervalId = setInterval(function(){
					if (itemsInfo.position.current < itemsInfo.position.max) {
						itemsInfo.update(itemsInfo.position.current + 1);
					} else {
						itemsInfo.reset();
					}
					_slideItem();
				}, itemsInfo.intervalSpeed)
			})

			nextButton = createHTMLElement("button", "next-control", "Next");
			nextButton.addEventListener("click", () => updateItemsInfo(itemsInfo.position.current + 1))

			controlsWrapper.append(prevButton, autoButton, nextButton);
			slider.append(controlsWrapper);
		}
	}

	// define function set buttons, arrows if classname is present
	function setClass(options) {
		if (options) {
			options.forEach(({element, className, disabled}) => {
				if (element) {
					disabled ? element.classList.add(className) : element.classList.remove(className)	
				} else {
					console.log("Error: function setClass(): element = ", element);
				}
			})
		}
	}

	function updateItemsInfo(value) {
		itemsInfo.update(value);
		_slideItem(true);	
	}

	
	function _render() {
		const {prevButtonDisabled, nextButtonDisabled} = controlsInfo;
		let controlsArray = [
			{element: leftArrow, className: "d-none", disabled: prevButtonDisabled},
			{element: rightArrow, className: "d-none", disabled: nextButtonDisabled}
		];
		if (controlsInfo.buttonsEnabled) {
			controlsArray = [
				...controlsArray, 
				{element:prevButton, className: "disabled", disabled: prevButtonDisabled},
				{element:nextButton, className: "disabled", disabled: nextButtonDisabled}
			];
		}
		
		setClass(controlsArray);

		sliderWrapper.style.transform = `translateX(${itemsInfo.offset*100}%)`;	
		
		if (controlsInfo.dotsEnabled) {
			if (document.querySelector(".dot--active")) {
				document.querySelector(".dot--active").classList.remove("dot--active");	
			}
			dotsWrapper.children[itemsInfo.position.current].classList.add("dot--active");
		}
	}

	function _slideItem(autoMode = false) {
		if (autoMode && intervalId) {
			clearInterval(intervalId);
		}
		_updateControlsInfo();
		_render();
	}

	function createHTMLElement(tagName="div", className, innerHTML) {
		const element = document.createElement(tagName);
		className ? element.className = className : null;
		innerHTML ? element.innerHTML = innerHTML : null;
		return element;
	}

	return {init};
}())

slider.init({
	// interval speed 1000,
	currentItem: 0,
	buttons: true,
	dots: true
});
