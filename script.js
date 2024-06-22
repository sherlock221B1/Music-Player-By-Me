const musicListIconTag = document.querySelector(".music-list-icon");
const songContainerTag = document.querySelector(".song-container");
const backArrowTag = document.querySelector(".fa-arrow-left");
const songs = [
  {
    songName: "As Time Goes By",
    artistName: "Dooley Wilson",
    songLink: "As Time Goes By dooley wilson ly.mp3",
  },
  {
    songName: "Jumong Instrumental Song",
    artistName: "Unknown",
    songLink: "Jumong Song.mp3",
  },
  {
    songName: "The Lonely",
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

  const musicIconTag = document.createElement("i"); //create musicIcon Tag From Fontawesome
  musicIconTag.classList.add("fa-solid", "fa-music");

  const songInfoTag = document.createElement("div"); // create songInfo Tag
  songInfoTag.classList.add("song-info");

  const songNameTag = document.createElement("h4"); // create songName Tag
  songNameTag.classList.add("song-name");
  const artistNameTag = document.createElement("span"); // create artistName Tag
  artistNameTag.classList.add("artist-name");

  songInfoTag.append(songNameTag, artistNameTag); // append songName Tag and artistName Tag to songInfo Tag
}
musicListIconTag.addEventListener("click", () => {
  musicListIconTag.classList.add("hide-music-list-icon");
  songContainerTag.classList.add("show-song-container");
});

backArrowTag.addEventListener("click", () => {
  musicListIconTag.classList.remove("hide-music-list-icon");
  songContainerTag.classList.remove("show-song-container");
});
