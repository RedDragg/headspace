// Selecteer alle audiospelers binnen het article.
const players = document.querySelectorAll("article section");

// Bewaar alle audio-elementen.
// Hiermee kunnen we andere audio pauzeren.
const allAudios = document.querySelectorAll("article audio");


/* Zet seconden om naar bijvoorbeeld 5:15. */
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}


/* Stel iedere audiospeler afzonderlijk in. */
players.forEach((player) => {
  // Zoek de elementen alleen binnen deze section.
  const audio = player.querySelector("audio");
  const playButton = player.querySelector("button");
  const progress = player.querySelector('input[type="range"]');
  const times = player.querySelectorAll("time");

  const currentTime = times[0];
  const durationTime = times[1];

  // Sla sections zonder audio over.
  if (!audio || !playButton || !progress) {
    return;
  }


  /* Werk de tijd en voortgangsbalk bij. */
  function updateProgress() {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);

    const percentage =
      audio.duration > 0
        ? (audio.currentTime / audio.duration) * 100
        : 0;

    progress.style.setProperty(
      "--progress",
      `${percentage}%`
    );
  }


  /* Play- en pauzeknop. */
  playButton.addEventListener("click", () => {
    if (audio.paused) {
      /*
        Pauzeer eerst alle andere audio-elementen.
        Hierdoor kan maar één audio tegelijk afspelen.
      */
      allAudios.forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
        }
      });

      audio.play();
    } else {
      audio.pause();
    }
  });


  /* Verander de knop naar een pauzeknop. */
  audio.addEventListener("play", () => {
    playButton.classList.add("playing");
    playButton.setAttribute("aria-label", "Pauzeren");
  });


  /* Verander de knop terug naar een playknop. */
  audio.addEventListener("pause", () => {
    playButton.classList.remove("playing");
    playButton.setAttribute("aria-label", "Afspelen");
  });


  /* Lees automatisch de lengte van het audiobestand. */
  audio.addEventListener("loadedmetadata", () => {
    progress.min = 0;
    progress.max = audio.duration;

    currentTime.textContent = "0:00";
    durationTime.textContent = formatTime(audio.duration);

    updateProgress();
  });


  /* Werk de slider tijdens het afspelen bij. */
  audio.addEventListener("timeupdate", updateProgress);


  /* Spoel wanneer de gebruiker de slider verplaatst. */
  progress.addEventListener("input", () => {
    audio.currentTime = Number(progress.value);
    updateProgress();
  });


  /* Zet alles netjes terug wanneer de audio eindigt. */
  audio.addEventListener("ended", () => {
    playButton.classList.remove("playing");
    playButton.setAttribute("aria-label", "Afspelen");

    audio.currentTime = 0;
    updateProgress();
  });
});