const urlSearchParams = new URLSearchParams(window.location.search);
const messageCustom = urlSearchParams.get('message');

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage');
  mainMessageElement.textContent = decodeURI(messageCustom);
}

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-audio', {
    height: '0',
    width: '0',
    videoId: ' 6L-IDYXvJ8o',
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: ' 6L-IDYXvJ8o'
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  const btnOpenElement = document.querySelector('#open');
  const btnCloseElement = document.querySelector('#close');
  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  const heartElement = document.querySelector('.heart');

  btnCloseElement.disabled = true;

  btnOpenElement.addEventListener('click', () => {
    btnOpenElement.disabled = true;
    btnCloseElement.disabled = false;
    coverElement.classList.add('open-cover');
    player.playVideo(); // Reproducir el audio

    setTimeout(() => {
      coverElement.style.zIndex = -1;
      paperElement.classList.remove('close-paper');
      paperElement.classList.add('open-paper');
      heartElement.style.display = 'block';
    }, 500);
  });

  btnCloseElement.addEventListener('click', () => {
    btnOpenElement.disabled = false;
    btnCloseElement.disabled = true;
    paperElement.classList.remove('open-paper');
    paperElement.classList.add('close-paper');
    player.stopVideo(); // Detener el audio

    setTimeout(() => {
      coverElement.style.zIndex = 0;
      coverElement.classList.remove('open-cover');
      heartElement.style.display = 'none';
    }, 500);
  });
}
