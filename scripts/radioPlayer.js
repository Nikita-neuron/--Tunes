export const radioPlayerInit = () => {
  // получаем элементы со страницы
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  // создаём объект Audio
  const audio = new Audio();
  audio.type = 'audio/aac';

  // деактивируем кнопку стопа
  radioStop.disabled = true;

  const changeIconPlay = () => {
    // смена иконки сиопа
    // и анимации динамика
    if  (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  }

  const selectItem = elem => {
    // стилизация иконок
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }

  radioNavigation.addEventListener('change', event => {
    // получение родителя выбранного элемента
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    // смена заголовка радио
    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    // смена картинки радио
    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;

    // меняем радиостанцию
    audio.src = target.dataset.radioStantion;

    // начинаем воспроизведение
    audio.play();
    
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    // отслеживание событий нажатия на кнопку стоп
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });
}