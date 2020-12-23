export const videoPlayerInit = () => {
  // получение элементов со страницы
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');  
  const videoTimeTotal = document.querySelector('.video-time__total');

  const toggleIcon = () => {
    // смена иконки стоп при проигрывании
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  }

  const togglePlay = () => {
    // остановка или воспроизведение видео
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }

  const stopPlay = () => {
    // остановка плеера
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  // добавление нулей в запись времени
  const addZero = n => n < 10 ? '0' + n : n;

  // отслеживание событий при нажатии на видео или на кнопку
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  // смена иконки при проигрывании плеера
  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    // получение текущего времени и общего времени
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    // установка ползунка по времени
    videoProgress.value = (currentTime / duration) * 100;

    // получение минут и секунд видео
    let minutePassed = Math.floor(currentTime / 60);
    let secondPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondTotal = Math.floor(duration % 60);

    // установка текущего и общего времени
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
  });

  videoProgress.addEventListener('input', () => {
    // отслеживание перемещение пользователем ползунка
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    // перемотка в зависимости от установленного значения
    videoPlayer.currentTime = (value * duration) / 100;
  });
}