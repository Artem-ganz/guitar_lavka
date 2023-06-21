const slider = document.querySelector(`.slider`)
const sliderLine = document.querySelector(`.slider-line`)
const slideWidth = sliderLine.firstElementChild.clientWidth
let slideIndex = 0

//клонирование первого слайда и добавление его в конец для бесконечной прокрутки
sliderLine.appendChild(sliderLine.firstElementChild.cloneNode(true))

//ф автовоспроизведения для прокрутки слайда каждые 5с
function autoplay() {
    slideIndex++
    sliderLine.style.transform = `translateX(${-slideIndex * slideWidth}px)`

    if(slideIndex >= sliderLine.children.length - 1) {
        slideIndex = 0
        //сброс на первый слайд после последнего слайда
        setTimeout(() => {
            sliderLine.style.transition = `none`
            sliderLine.style.transform = `translateX(0)`
            setTimeout(() => {
                sliderLine.style.transition = `transform 0.5s ease-in-out`
            },50)
        },500)
    }
}

let timer = setInterval(autoplay, 5000)

//приостановка автовоспроизведения при наведении мыши
slider.addEventListener(`mouseover`, () => {
    clearInterval(timer)
})

//возобновление автовосп при наведении мыши
slider.addEventListener(`mouseout`, () => {
    timer = setInterval(autoplay, 3000)
})