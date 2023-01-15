export function player2Controls() {
  const player2 = document.querySelector<HTMLDivElement>('#player-2')
  const stylesElement = document.head.appendChild(document.createElement("style"));

  if (!player2) {
    return
  }

  const playButton = player2.querySelector<HTMLButtonElement>('.play')
  const restartMusicButton = player2.querySelector<HTMLButtonElement>('.prev')
  const endMusicButton = player2.querySelector<HTMLButtonElement>('.next')

  const timeTracker = player2.querySelector<HTMLDivElement>('.track')
  const musicTotalTimeIndicator = player2.querySelector<HTMLDivElement>('.total-time')
  const musicHeardTimeIndicator = player2.querySelector<HTMLDivElement>('.heard-time')

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

  const music = new Audio('/assets/songs/addictions.mp3')
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

    stylesElement.innerHTML = `#player-2 .track::after {width: ${percentageHeard}%;}`
  }, 200)
}