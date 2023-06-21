////////////// смена цвета темы фона
document.querySelector('.themetoggle').addEventListener('click', event => {
    event.preventDefault();
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme');
    }
    else {
      localStorage.setItem('theme', 'dark')
    }
    addDarkClassToHTML()
  });
  
  function addDarkClassToHTML() {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        document.querySelector('html').classList.add('dark');
        document.querySelector('.themetoggle span').textContent = 'dark_mode';
      }
      else {
        document.querySelector('html').classList.remove('dark');
        document.querySelector('.themetoggle span').textContent = 'wb_sunny';
      }
    } catch (err) { }
}
  
addDarkClassToHTML();

//////////////////////////////////////////////////////
// menu-bg
const menu = document.querySelector(`.header__nav`)
const menuBtn = document.querySelector(`.menu__icon`)
const body = document.body

if(menu && menuBtn) {
  menuBtn.addEventListener(`click`, () => {
    menu.classList.toggle(`active`)
    menuBtn.classList.toggle(`active`)
    body.classList.toggle(`lock`)
  })

  menu.querySelectorAll(`.header__nav_link`).forEach(link => {
    link.addEventListener(`click`, () => {
      menu.classList.remove(`active`)
      menuBtn.classList.remove(`active`)
      body.classList.remove(`lock`)
    })
  })
}

////////////////////
// Акардеон секции
let btnRandom4 = document.querySelectorAll(`.btn-exemlpe1`)

for (let i = 0; i < btnRandom4.length; i++) {
  btnRandom4[i].onclick = () => {
    btnRandom4[i].classList.toggle(`acord-open`)
  }
}

// console.log(btnRandom4[0]);

///////////////////////////////
// Кнопка скрола вверх
function backToTop () {
	let button = $('.back-to-top')
	$(window).on('scroll', () => {
		if($(this).scrollTop() >= 950) {
			button.fadeIn()
		} else {
			button.fadeOut()
		}
	})

	button.on('click', (e) => {
		e.preventDefault()
		$('html').animate({scrollTop: 0}, 1500)
	})
}

backToTop()

/////////////////////
// oclock
function showTime () {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = 'AM';

  if(h == 0){
    h = 12;
  }

  if(h > 12) {
    h = h - 12;
    session = 'PM';
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  let time = h + ":" + m + ":" + s + " " + session;
  document.querySelector('.clock').innerText = time;
  document.querySelector('.clock').textContent = time;
  setTimeout(showTime,1000);
};
showTime();
