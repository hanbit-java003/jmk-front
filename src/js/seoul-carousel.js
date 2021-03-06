var slides = [];

var carousel = $('.seoul-photos .seoul-carousel-visible');
var animating = false;
var currentSlideIndex = 0; // 현재 보이는 인덱스.
var timer;
// 시간초들 변수화.
var slideDuration = 500;
var slideInterval = 3000;

var createSlideElement;

function init(carouselElement, _slides, _createSlideElement,options) {
    carousel = carouselElement.find('.seoul-carousel-visible');
    slides = _slides;
    createSlideElement = _createSlideElement;

    if (options) {
        slideDuration = options.slideDuration || slideDuration;
        slideInterval = options.slideInterval || slideInterval;
    }

    var firstSlideElement = (createSlideElement(slides[currentSlideIndex]));
    carousel.append(firstSlideElement);

    timer = setTimeout(function () {
        slide('left');
    },slideInterval);
}

function slide(direction) {
    animating=true;
    clearTimeout(timer);
    var currentSlide = slides[currentSlideIndex];
    var nextSlide;

    if (direction === 'left') {
        nextSlide = slides[++currentSlideIndex];

        if (!nextSlide) {
            currentSlideIndex = 0;
            nextSlide = slides[currentSlideIndex];
        }
    }
    else if (direction === 'right') {
        nextSlide = slides[--currentSlideIndex];

        if (!nextSlide) {
            currentSlideIndex = slides.length - 1;
            nextSlide = slides[currentSlideIndex];
        }
    }
    var currentElement = carousel.find('li');


    var nextElement = createSlideElement(nextSlide);

    var animationLeft;

    if(direction === 'left') {
        nextElement.css('left', '100%');
        animationLeft = '-=100%';
    }
    else if (direction === 'right'){
        nextElement.css('left', '-100%');
        animationLeft = '+=100%';
    }

    carousel.append(nextElement);

    carousel.find('li').animate({
       left: animationLeft
    },{
        duration: slideDuration,
        complete: function () {
            currentElement.remove();
            animating = false;
            if (this === currentElement[0]) {
                return;
            }

            timer = setTimeout(function () {
                slide('left');
            },slideInterval);
        }
    });
}



$('.seoul-carousel-arrow').on('click', function () {

    if (animating) {
        return;
    }

    if ($(this).hasClass('left')) {
        slide('right');
    }
    else if ($(this).hasClass('right')) {
        slide('left');
    }
});



module.exports = {
    init : init
};



/*
function init(carouselElement, _slides, _createSlideElement, options) {
    carousel = carouselElement.find('.seoul-carousel-visible');
    slides = _slides;
    createSlideElement = _createSlideElement;

    if (options) {
        slideDuration = options.slideDuration || slideDuration;
        slideInterval = options.slideInterval || slideInterval;
    }

    var firstSlideElement = createSlideElement(slides[currentSlideIndex]);
    carousel.append(firstSlideElement);



    timer = setTimeout(function() {
        slide('left');
    }, slideInterval);
}

function slide(direction) {
    animating = true;
    clearTimeout(timer);

    var currentSlide = slides[currentSlideIndex];
    var nextSlide;

    if (direction === 'left') {
        nextSlide = slides[++currentSlideIndex];

        if (!nextSlide) {
            currentSlideIndex = 0;
            nextSlide = slides[currentSlideIndex];
        }
    }
    else if (direction === 'right') {
        nextSlide = slides[--currentSlideIndex];

        if (!nextSlide) {
            currentSlideIndex = slides.length - 1;
            nextSlide = slides[currentSlideIndex];
        }
    }

    var currentElement = carousel.find('li');

    // 새로운 슬라이드를 만들어내는 부분이다.
    // 슬라이드 내용에 따라 이부분이 달라질 것이다.
    var nextElement = createSlideElement(nextSlide);// 변수로 받을 것이다.


    var animationLeft;

    if (direction === 'left') {
        nextElement.css('left', '100%');
        animationLeft = '-=100%';
    }
    else if (direction === 'right') {
        nextElement.css('left', '-100%');
        animationLeft = '+=100%';
    }

    carousel.append(nextElement);

    carousel.find('li').animate({
        left: animationLeft
    }, {
        duration: slideDuration,
        complete: function() {
            currentElement.remove();
            animating = false;

            if (this === currentElement[0]) {
                return;
            }

            timer = setTimeout(function() {
                slide('left');
            }, slideInterval);
        }
    });
}

$('.ht-carousel-arrow').on('click', function() {
    if (animating) {
        return;
    }

    if ($(this).hasClass('left')) {
        slide('right');
    }
    else if ($(this).hasClass('right')) {
        slide('left');
    }
});



module.exports = {
    init: init
};
*/
