// Загружаем из файла images.js
// const images = ['1.png', '2.png', '3.png', '4.png', '5.png',
//     '6.png', '7.png', '8.png', '9.png', '10.png',
//     '11.png', '12.png', '13.png', '14.png', '15.png',
//     '16.png', '17.png', '18.png', '19.png', '20.png',
//     '21.png', '22.png', '23.png', '24.png', '25.png'
// ];

images = JSON.parse(imagesArr);

const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const autoPlayEl = document.querySelector('.auto-play');
const contentEl = document.querySelector('.content');
const imgEl = document.querySelector('.image-container');
const timeoutInp = document.getElementById('timeout');

let intervalAutoPlay = undefined; // setInterval

function cyclicCounter(initialCount, maxCount) {
    let curCount = initialCount;
    return {
        value: () => {return curCount},
        set: initCount => {return curCount = initCount},
        change: (direction = "+") => {
            if (direction === '+') {
                return curCount = curCount >= maxCount ? 0 : ++curCount;
            } else {
                return curCount = curCount <= 0 ? maxCount : --curCount;
            }
        }
    };
}

function createButtons(rootEl, data) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('container');
    buttonsContainer.classList.add('d-flex');
    buttonsContainer.classList.add('justify-content-center');
    buttonsContainer.classList.add('flex-wrap');
    buttonsContainer.classList.add('py-3');
    buttonsContainer.classList.add('gap-1');
    data.forEach((element, index) => {
        const newBtn = document.createElement('button');
        newBtn.classList.add('btn');
        newBtn.classList.add('btn-sm');
        newBtn.classList.add('btn-outline-primary');
        newBtn.textContent = index;
        newBtn.setAttribute('data-index', index);
        buttonsContainer.appendChild(newBtn);
    });
    rootEl.append(buttonsContainer);
}

const cyclicCounter1 = cyclicCounter(0, images.length - 1);

const setImage = ind => {
    imgEl.setAttribute('src', `./img/${images[ind]}`);

    const oldBtns = document.querySelectorAll('.active');
    oldBtns.forEach(element => {
        element.classList.remove('active');
    });

    const newBtn = document.querySelector(`[data-index="${ind}"]`);
    newBtn.classList.add('active');
}

function autoPlay(autoplayCheckBox, duration) {
    clearInterval(intervalAutoPlay);

    if (autoplayCheckBox.hasAttribute('checked')) {
        intervalAutoPlay = setInterval(() => {
            setImage(cyclicCounter1.change());
        }, duration);
    }
}

function toogleCheckBoxChecked(checkBox) {
    if (checkBox.hasAttribute('checked')) checkBox.removeAttribute('checked');
    else checkBox.setAttribute('checked', true);
}

// Предыдущая картинка
prevBtn.addEventListener('click', function (e) {
    setImage(cyclicCounter1.change('-'));
});

// Следущая картинка
nextBtn.addEventListener('click', function (e) {
    setImage(cyclicCounter1.change());
});

// Кнопки картинок
contentEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset['index'];
        setImage(cyclicCounter1.set(index));
    }
});

// После загрузки
window.addEventListener('load', function (e) {
    createButtons(contentEl, images);
    setImage(cyclicCounter1.value());
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});

// Кнопка автоплэй
autoPlayEl.addEventListener('change', function (e) {
    toogleCheckBoxChecked(autoPlayEl);
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});

// Изменение таймаута автоплэя
timeoutInp.addEventListener('change', function (e) {
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});