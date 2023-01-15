export function player1Controls() {
  const player1 = document.querySelector<HTMLDivElement>('#player-1')
  const stylesElement = document.head.appendChild(document.createElement("style"));

  if (!player1) {
    return
  }

  const playButton = player1.querySelector<HTMLButtonElement>('.play')
  const restartMusicButton = player1.querySelector<HTMLButtonElement>('.prev')
  const endMusicButton = player1.querySelector<HTMLButtonElement>('.next')

  const timeTracker = player1.querySelector<HTMLDivElement>('.track')
  const musicTotalTimeIndicator = player1.querySelector<HTMLDivElement>('.total-time')
  const musicHeardTimeIndicator = player1.querySelector<HTMLDivElement>('.heard-time')

  if (
    !playButton
    || !restartMusicButton
    || !endMusicButton
    || !musicTotalTimeIndicator
    || !musicHeardTimeIndicator
    || !timeTracker
  ) {
    return
  }

  const music = new Audio('/assets/songs/im-above.mp3')
  music.controls = true

  music.addEventListener('loadeddata', () => {
    const minutes = Math.floor(music.duration / 60)
    const seconds = music.duration - (minutes * 60)

    const parsedMinutes = String(minutes).padStart(2, '0')
    const parsedSeconds = String(seconds).slice(0, 2).padStart(2, '0')

    musicTotalTimeIndicator.innerHTML = `${parsedMinutes}:${parsedSeconds}`
  })

  playButton.addEventListener('click', () => {
    if (music.paused) {
      music.play()
      playButton.innerHTML = '<img src="/assets/icons/pause-icon.svg" alt="pause button">'
    } else {
      music.pause()
      playButton.innerHTML = '<img src="/assets/icons/play-icon.svg" alt="play button">'
    }
  })

  restartMusicButton.addEventListener('click', () => {
    music.currentTime = 0
  })

  endMusicButton.addEventListener('click', () => {
    music.currentTime = music.duration
  })

  setInterval(() => {
    const minutes = Math.floor(music.currentTime / 60)
    const seconds = music.currentTime - (minutes * 60)

    const parsedMinutes = String(minutes).padStart(2, '0')
    const parsedSeconds = String(seconds).slice(0, String(seconds).indexOf('.')).padStart(2, '0')

    musicHeardTimeIndicator.innerHTML = `${parsedMinutes}:${parsedSeconds}`

    const percentageHeard = (music.currentTime / music.duration) * 100

    if (percentageHeard >= 100) {
      playButton.innerHTML = '<img src="/assets/icons/play-icon.svg" alt="play button">'
    }

    stylesElement.innerHTML = `#player-1 .track::after {width: ${percentageHeard}%;}`
  }, 100)
}