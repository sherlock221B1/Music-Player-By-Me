const musicListIconTag = document.querySelector(".music-list-icon"); // music list icon tag
const songContainerTag = document.querySelector(".song-container"); // song container tag
const backArrowTag = document.querySelector(".fa-arrow-left"); // back arrow tag
const titleTag = document.querySelector(".title"); // title tag
const songNameAtMainPageTag = document.querySelector(".song-name-at-main-page"); // song name at main page tag
const artistNameAtMainPageTag = document.querySelector(
  ".artist-name-at-main-page"
); // artist name at main page

const playButtonTag = document.querySelector(".fa-circle-play"); // play Button
const nextButtonTag = document.querySelector(".fa-forward-step"); // next Button
const previousButtonTag = document.querySelector(".fa-backward-step"); // previous Button

const progressBarTag = document.querySelector(".progress-bar"); // progressBar
const currentprogressBarTag = document.querySelector(".current-progress-bar"); // current progress bar
const currentprogressBarIndicatorTag = document.querySelector(
  ".current-progress-bar-indicator"
); // current progress-bar indicator

const currentDurationTag = document.querySelector(".current-duration"); // current duration tag
const totalDurationTag = document.querySelector(".total-duration"); // total duration tag

const audioTag = document.querySelector(".audio"); // audio tag

//song array
const songs = [
  {
    songName: "As Time Goes By",
    artistName: "Dooley Wilson",
    songLink: "As Time Goes By dooley wilson ly.mp3",
  },
  {
    songName: "Jumong Song",
    artistName: "Unknown",
    songLink: "Jumong Song.mp3",
  },
  {
    songName: "The Lonely Sherpherd",
    artistName: "James Last",
    songLink: "The Lonely Sherpherd.mp3",
  },
  {
    songName: "Laise Muije",
    artistName: "Unknown",
    songLink: "Kaise Muije.mp3",
  },
  {
    songName: "နှင်းဆီဖြူရဲ့ အဝေးကလူ",
    artistName: "ခင်ဝမ်း",
    songLink: "နှင်းဆီဖြူရဲ့ အဝေးက လူ.mp3",
  },
  {
    songName: "မိုးသက်လေနှင်",
    artistName: "မန္တလေးသိန်းဇော်",
    songLink: "မိုးသက်လေနှင်.mp3",
  },
];

// try later to place the music list icon responsively
//console.log(musicListIconTag.style.top,musicListIconTag.style.right)
//console.log(titleTag.offsetLeft,titleTag.offsetTop)

let currentPlayingIndex = 0; // set the default song
let newSongIsPlayed = false; // to remove the color of previous song (it will be changed to true when the new song is played # see in the eventListener of songTag,previousButtonTag and nextButtonTag)

//build song container
/*
          <!-- Song -->
          <div class="song">
            <!-- Music Icon From Font Awesome-->
            <i class="fa-solid fa-music"></i>
            <!-- Song Info -->
            <div class="song-info">
              <h4 class="song-name">နှလုံးသားမှာအားလုံးရှိတယ်</h4>
              <span class="artist-name">နိုင်မြန်မာ</span>
            </div>
          </div>
 */

for (let i = 0; i < songs.length; i++) {
  const songTag = document.createElement("div"); // create song tag
  songTag.classList.add("song");

  songTag.id = i; // give id for each song tag

  const musicIconTag = document.createElement("i"); //create musicIcon Tag From Fontawesome
  musicIconTag.classList.add("fa-solid", "fa-music");

  const songInfoTag = document.createElement("div"); // create songInfo Tag
  songInfoTag.classList.add("song-info");

  const songNameTag = document.createElement("h4"); // create songName Tag
  songNameTag.classList.add("song-name");
  const songName = songs[i].songName; // take song name from songs array
  songNameTag.append(songName); // append song name to songNameTag

  const artistNameTag = document.createElement("span"); // create artistName Tag
  artistNameTag.classList.add("artist-name");
  const artistName = songs[i].artistName; // take artist name form songs array
  artistNameTag.append(artistName);

  songInfoTag.append(songNameTag, artistNameTag); // append songName Tag and artistName Tag to songInfo Tag
  songTag.append(musicIconTag, songInfoTag); // append musicIconTag and songInfoTag to songTag

  songContainerTag.append(songTag); // append songTag to songContainerTag

  // addEventListener to each song tag
  songTag.addEventListener("click", () => {
    currentPlayingIndex = i; // to play the clicked song
    newSongIsPlayed = true; // to remove the color of previous song
    updateTheSong();
    playTheSong();
  });
}

// open song container when click music list
musicListIconTag.addEventListener("click", () => {
  musicListIconTag.classList.add("hide-music-list-icon");
  songContainerTag.classList.add("show-song-container");
});

// close song container when click back arrow
backArrowTag.addEventListener("click", () => {
  musicListIconTag.classList.remove("hide-music-list-icon");
  songContainerTag.classList.remove("show-song-container");
});

// addEventListerer to playButtonTag
playButtonTag.addEventListener("click", () => {
  if (playButtonTag.classList.contains("fa-circle-play")) {
    //play music, remove play button and add pause button when click play button
    playTheSong();
  } else {
    //pause music, remove pause button and add play button when click pause button
    pauseTheSong();
  }
});

// addEventListener to nextButtonTag
nextButtonTag.addEventListener("click", () => {
  currentPlayingIndex += 1; // go to next song
  if (currentPlayingIndex >= songs.length) {
    currentPlayingIndex = 0; // if there is no next song go back to first song
  }

  newSongIsPlayed = true; //to remove the color of previous song

  updateTheSong();
  playTheSong();
});

// addEventListener to previousButtonTag
previousButtonTag.addEventListener("click", () => {
  currentPlayingIndex -= 1; // go to previous song

  if (currentPlayingIndex <= -1) {
    currentPlayingIndex = songs.length - 1; // go to last song if there is no previous song
  }

  newSongIsPlayed = true; //to remove the color of previous song

  updateTheSong();
  playTheSong();
});

// addEventListener to audio tag to update the current duration,current progressBar and current progressBar indicator
audioTag.addEventListener("timeupdate", () => {
  // update the current duration
  const currentMinute = Math.floor(audioTag.currentTime / 60);
  const currentSecond = Math.floor(audioTag.currentTime % 60);

  const currentMinuteText = currentMinute;
  const currentSecondText =
    currentSecond < 10 ? `0${currentSecond}` : currentSecond;

  currentDurationTag.innerHTML = `${currentMinuteText}:${currentSecondText}`;

  // update the current progressBar
  const percentOfCurrentProgressBar =
    (audioTag.currentTime / audioTag.duration) * 100; // percent of current progress bar = percent of current time
  currentprogressBarTag.style.width = `${percentOfCurrentProgressBar}%`;
});

// addEventListener to audio tag to play the next song automatically when the current song is ended
audioTag.addEventListener("ended", () => {
  nextButtonTag.click(); // if the current song is ended the new song will be played
});

// addEventListener to document to play and pause the song when click the space bar
document.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    playButtonTag.click(); // clicking space bar = clicking play and pause button
  }
});

// update the song
const updateTheSong = () => {
  titleTag.innerHTML = ` Playing ( ${songs[currentPlayingIndex].songName} ) of ( ${songs[currentPlayingIndex].artistName} )`;
  songNameAtMainPageTag.innerHTML = songs[currentPlayingIndex].songName;
  artistNameAtMainPageTag.innerHTML = songs[currentPlayingIndex].artistName;
  audioTag.src = songs[currentPlayingIndex].songLink;

  // update total duration of song
  // ဒီမှာ duration ကိုရဖို့ audio tag ကို loadeddata event နားထောင်ဖို့လို
  audioTag.addEventListener("loadeddata", () => {
    // change total duration to min and second
    const totalMinute = Math.floor(audioTag.duration / 60);
    const totalSecond = Math.floor(audioTag.duration % 60);

    const totalMinuteText = totalMinute;
    const totalSecondText = totalSecond < 10 ? `0${totalSecond}` : totalSecond;

    totalDurationTag.innerHTML = `${totalMinuteText}:${totalSecondText}`;
  });

  // remove color for previous songTag
  if (newSongIsPlayed) {
    const previousSongTag = document.querySelector(".current-song");
    previousSongTag.classList.remove("current-song");
  }

  // set color for current playing songTag
  const currentSongTag = document.getElementById(currentPlayingIndex);
  currentSongTag.classList.add("current-song");
};
updateTheSong();
const playTheSong = () => {
  audioTag.play();
  playButtonTag.classList.remove("fa-circle-play");
  playButtonTag.classList.add("fa-circle-pause");
};
const pauseTheSong = () => {
  audioTag.pause();
  playButtonTag.classList.remove("fa-circle-pause");
  playButtonTag.classList.add("fa-circle-play");
};
