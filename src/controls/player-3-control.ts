export function player3Controls() {
  const player3 = document.querySelector<HTMLDivElement>('#player-3')

  if (!player3) {
    return
  }

  const playButton = player3.querySelector<HTMLButtonElement>('.play')
  const restartMusicButton = player3.querySelector<HTMLButtonElement>('.prev')
  const endMusicButton = player3.querySelector<HTMLButtonElement>('.next')

  if (
    !playButton
    || !restartMusicButton
    || !endMusicButton
  ) {
    return
  }

  const music = new Audio('/assets/songs/triste-pra-sempre.mp3')
  music.controls = true

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
    const percentageHeard = (music.currentTime / music.duration) * 100

    if (percentageHeard >= 100) {
      playButton.innerHTML = '<img src="/assets/icons/play-icon.svg" alt="play button">'
    }
  }, 100)
}