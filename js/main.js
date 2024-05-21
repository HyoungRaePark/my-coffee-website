// 검색창 요소(.Serch) 찾기

const serchEl = document.querySelector('.search');
const serchInputEl = serchEl.querySelector('input');

// 검색창 요소를 클릭하면 실행

serchEl.addEventListener('click',function()
{
    serchInputEl.focus();
});

//검색창 요소 내부 실제 input 요소에 포커스 되면 실행
serchInputEl.addEventListener('focus',function()
{
    serchEl.classList.add('focused');
    serchInputEl.setAttribute('placeholder', '통합검색');
});

// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행
serchInputEl.addEventListener('blur',function()
{
    serchEl.classList.remove('focused');
    serchInputEl.setAttribute('placeholder', '');
});

const modalBtn = document.querySelector(".modal-Btn");
const modal = document.querySelector(".modal");

modalBtn.addEventListener("click", () => {
   modal.showModal();
});


const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let score = 0;

let snake;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      score++;
      document.getElementById("score").textContent = score;
      fruit.pickLocation();
    }

    snake.checkCollision();
  }, 250);
}());

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale;
  this.ySpeed = 0;
  this.tail = [];

  this.draw = function () {
    ctx.fillStyle = "#4CAF50";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  };

  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.tail.length - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.y < 0 || this.x >= canvas.width || this.y >= canvas.height) {
      this.reset();
    }
  };

  this.changeDirection = function (direction) {
    switch (direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -scale;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = scale;
        break;
      case "Left":
        this.xSpeed = -scale;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = scale;
        this.ySpeed = 0;
        break;
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.tail.push({ x: this.x, y: this.y });
      return true;
    }
    return false;
  };

  this.checkCollision = function () {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        gameOver();
      }
    }
  };


  this.reset = function () {
    this.x = 0;
    this.y = 0;
    this.tail = [];
    this.xSpeed = scale;
    this.ySpeed = 0;
    score = 0;
    document.getElementById("score").textContent = score;
  };
}

function Fruit() {
  this.x = 0;
  this.y = 0;

  this.pickLocation = function () {
    this.x = Math.floor(Math.random() * columns) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
  };

  this.draw = function () {
    ctx.fillStyle = "#FF4136";
    ctx.fillRect(this.x, this.y, scale, scale);
  };
}

window.addEventListener("keydown", (event) => {
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
});


const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = sliderWrap.querySelector(".slider__img");         //보여지는 영역
const sliderInner = sliderWrap.querySelector(".slider__inner");     //움직이는 영역
const slider = sliderWrap.querySelectorAll(".slider");              //개별 이미지

let currentIndex = 0;                                               //현재 보이는 이미지
let sliderCount = slider.length;                                    //이미지 갯수
let sliderInterval = 2000;                                          //이미지 변경 간격 시간
let sliderWidth = slider[0].offsetWidth;                            //이미지 가로 값
let sliderClone = sliderInner.firstElementChild.cloneNode(true);    //첫번째 이미지 복사

// 복사한 첫 번째 이미지 마지막에 붙여넣기
sliderInner.appendChild(sliderClone);

function sliderEffect(){
    currentIndex++;

    sliderInner.style.transition = "all 0.6s";
    sliderInner.style.transform = "translateX(-"+ sliderWidth * currentIndex +"px)";

    //마지막 이미지에 위치 했을 때
    if(currentIndex == sliderCount){
        setTimeout(() => {
            sliderInner.style.transition = "0s";
            sliderInner.style.transform = "translateX(0px)";
        }, 700);

        currentIndex = 0;
    }

}

setInterval(sliderEffect, sliderInterval);


const badgeEl =document.querySelector('header .badges');
const toTopEl =document.querySelector('#to-top')
window.addEventListener('scroll', function ()
{
  console.log(window.scrollY);
  if (window.scrollY >500)
    {
      gsap.to(badgeEl,.6,
        {
          opacity: 0,
          display: 'none'
        });

        // 상단으로 이동 버튼 보이기
        gsap.to(toTopEl, .6, 
          {
            opacity: 1,
            x: 0
          });
    }
    else
    {
      gsap.to(badgeEl,.6,
        {
          opacity: 1,
          display: 'block'
        });
        // 상단으로 이동 버튼 숨기기
        gsap.to(toTopEl, .6, 
          {
            opacity: 0,
            x: 100
          });
    }
});

//나타날 요소
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index)
{
  gsap.to(fadeEl, 1, 
    {
      delay: (index + 1) * .7,
      opacity: 1
    });
});

new Swiper('.notice .swiper',
{
  direction: 'vertical',
  autoplay : true,
  loop: true
});

new Swiper('.promotion .swiper',
{
  autoplay: true,
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides :true,
  pagination : {
    el: '.promotion .swiper-pagination',
    clickabvle: true
  },
  navigation: {
    prevEl: '.promotion .swiper-button-prev',
    nextEl: '.promotion .swiper-button-next'
  }
  
});

/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색!
const promotionEl = document.querySelector('section.promotion');
// 슬라이드 영역를 토글하는 버튼 검색!
const promotionToggleBtn = document.querySelector('.toggle-promotion');

// 토글 버튼을 클릭하면,
promotionToggleBtn.addEventListener('click', function () {
  if (promotionEl.classList.contains('hide')) {
    promotionEl.classList.remove('hide');
  } else {
    promotionEl.classList.add('hide');
  }
});

new Swiper('.awards .swiper',
{
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation:
  {
    prevEl:'.awards .swiper-button-prev',
    nextEl:'.awards .swiper-button-next'
  }
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

toTopEl.addEventListener('click',function()
{
  gsap.to(window, .6,
    {
      scrollTo:0
    });
});