let playButton = document.getElementById("playBtn");
let mainSide = document.querySelector(".Main");
let slider = document.querySelector(".slider")
let silderIcon = document.getElementById("toggle")
let circle = document.querySelector(".circle")
let seekBar = document.querySelector(".seek1")
let updateBar = document.querySelector(".bar")
let volume = document.querySelector(".volume")
let volumeSeekbar =document.getElementById("volume");
let startTime = document.querySelector(".start")
let endTime = document.querySelector(".end")
let backwardBtn = document.getElementById("backward")
let forwardBtn = document.getElementById("forward");
let nextSong = document.getElementById("nextSong");
let previousSong = document.getElementById("previus");
let currentSongName = document.querySelector(".songNameFull")
let getImges = document.querySelector(".getImg")
let getImges1 = document.querySelector(".getImg1")
let songArtiest =document.querySelector(".songArtiest");
let repeatBtn = document.getElementById("repeatBtn");
let songNameAdd = Array.from(document.getElementsByClassName("songList"))
let audio = new Audio("");
audio.src ="music/Saari Duniya Jalaa Denge Animal 320 Kbps.mp3"
audio.volume = 0.10;
let songIndex= 0;
//Song List 
let songList=[
    {musicName:"Saari Duniya Jalaa Denge",
     songPath:"music/Saari Duniya Jalaa Denge Animal 320 Kbps.mp3",
     songWriter:"Ft.jaani",
     songImg:"img/sari.jpg"},
    {musicName:"Tu Jaane Na",
     songPath:"music/Tu-Jaane-Na-(Slowed-Reverb)(PagalWorld).mp3",
     songWriter:"Ft.Irshad Kamil",
     songImg:"img/TU JANE.jpg"},
    {musicName:"Hua Main",
     songPath:"music/Hua Main Animal 320 Kbps.mp3",
     songWriter:"Ft.Manoj Muntashir",
     songImg:"img/hua mein.jpg"},
    {musicName:"Khaab",
     songPath:"music/Khaab Akhil 320 Kbps.mp3",
     songWriter:"Ft.Akhil",
     songImg:"img/Khaab.jpg"},
    {musicName:"See You Again",
     songPath:"music/When-I-See-You-Again(PaglaSongs).mp3",
     songWriter:"Ft. Charlie Puth",
     songImg:"img/see you again.jpg"},
    {musicName:"Perfect",
     songPath:"music/Ed-Sheeran-Perfect.mp3",
     songWriter:"Ed-Sheeran",
     songImg:"img/perfect.jpg"}
]
let allPlay =()=>{
    Array.from(document.getElementsByClassName("makeAllPlay")).forEach((elemnt)=>{
        elemnt.classList.remove("fa-pause");
        elemnt.classList.add("fa-play");
    })
}
songNameAdd.forEach((e, i)=>{                                          
    e.getElementsByClassName("songNames")[0].innerText = songList[i].musicName;
    let a = document.getElementsByClassName("heartBtn")[i];
    a.addEventListener("click",()=>{
        if(a.style.background == "black"){
        a.style.background ="red"
        }
        else{
            a.style.background="black"
        }
    })
    
    let makeAllPlay = document.getElementsByClassName("makeAllPlay")[i];
    makeAllPlay.addEventListener("click",(e)=>{
        
        
        allPlay()
        if(audio.paused){
            audio.src = songList[i].songPath;
            audio.play();
            makeAllPlay.classList.remove("fa-play");
            makeAllPlay.classList.add("fa-pause")
            circle.classList.add("around");
            document.querySelector(".circle1").classList.add("around")
            getImges.src = songList[i].songImg;
            getImges1.src = songList[i].songImg;
            playButton.classList.remove("fa-play")
            playButton.classList.add("fa-pause")
            
        }else{
            audio.pause();
            makeAllPlay.classList.remove("fa-pause");
            makeAllPlay.classList.add("fa-play");
            circle.classList.remove("around");
            document.querySelector(".circle1").classList.remove("around")
            playButton.classList.remove("fa-pause")
            playButton.classList.add("fa-play")
        }
})
})
//Play Button
function playSongBtn(){
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        playButton.classList.remove("fa-play")
        playButton.classList.add("fa-pause")
        circle.classList.add("around");
        document.querySelector(".circle1").classList.add("around")
        allPause()
    }
    else{
        audio.pause();
        playButton.classList.remove("fa-pause")
        playButton.classList.add("fa-play")
        circle.classList.remove("around");
        document.querySelector(".circle1").classList.remove("around")
        allPlay()
    }
}
playButton.addEventListener("click", playSongBtn )

audio.addEventListener("timeupdate",()=>{
    let getValue = Math.floor((audio.currentTime/audio.duration)*100);
    // console.log(getValue)
    
    //DURATION  of the time    
    let duration_minuts = Math.floor(audio.duration/60);
    let duration_seconds = Math.floor(audio.duration%60);
    if(duration_minuts<10){
        duration_minuts = `0${duration_minuts}`
    }
    if(duration_seconds<10){
        duration_seconds = `0${duration_seconds}`
    }
    if(audio.duration){
        endTime.innerHTML = `${duration_minuts}:${duration_seconds}`
    }
    // current time 
    seekBar.style.width = `${getValue}%`;
    let minuts = Math.floor(audio.currentTime/60);
    let seconds = Math.floor(audio.currentTime%60);
    if(minuts < 10){
       minuts  =`0${minuts}`
    }
    if(seconds<10){
        seconds = `0${seconds}`
    }
    startTime.innerHTML =`${minuts}:${seconds}`
})

seekBar.addEventListener("change",()=>{
  audio.currentTime = seekBar.style.width;
})

volume.addEventListener("click", ()=>{
    if(volumeSeekbar.style.opacity == 0){
        volumeSeekbar.style.opacity =1
    }else{
        volumeSeekbar.style.opacity =0;
    }
})

volumeSeekbar.addEventListener("change",()=>{
    audio.volume = volumeSeekbar.value/100;
})
backwardBtn.addEventListener("click",()=>{
    audio.currentTime -= 10;
})
forwardBtn.addEventListener("click",()=>{
    audio.currentTime += 10;
})
let slide = ()=>{
    if(slider.style.display =="none"){
        slider.style.display ="block"
        mainSide.style.display ="none"
        mainSide.style.opacity =0
        slider.style.opacity =1;
    }else
    {   
        slider.style.display ="none"
        mainSide.style.display ="block"
        mainSide.style.opacity =1
        slider.style.opacity =0;
    }
}
//next song Play 
let nextSongBtn = ()=>{
    songIndex++;
    if(songIndex > songList.length-1){
        songIndex = 0
        audio.src = songList[songIndex].songPath;
        currentSongName.innerHTML = songList[songIndex].musicName;
        getImges.src = songList[songIndex].songImg;
        getImges1.src = songList[songIndex].songImg;
        songArtiest.innerHTML = songList[songIndex].songWriter;
        audio.currentTime = 0;
        audio.play();
    }
    else{
        audio.src = songList[songIndex].songPath;
        currentSongName.innerHTML = songList[songIndex].musicName;
        getImges.src = songList[songIndex].songImg;
        getImges1.src = songList[songIndex].songImg;
        songArtiest.innerHTML = songList[songIndex].songWriter;
        audio.currentTime = 0;
        audio.play();
    }
}
nextSong.addEventListener("click",nextSongBtn);
//automatic  play Next song
audio.addEventListener("ended",nextSongBtn)
//previous song btn 
previousSong.addEventListener("click", ()=>{
    songIndex--;
    if(songIndex <= 0){
        songIndex = songList.length-1;
        audio.src = songList[songIndex].songPath;
        currentSongName.innerHTML = songList[songIndex].musicName;
        getImges.src = songList[songIndex].songImg;
        getImges1.src = songList[songIndex].songImg;
        songArtiest.innerHTML = songList[songIndex].songWriter;
        audio.currentTime = 0;
        audio.play();
    }
    else{
        audio.src = songList[songIndex].songPath;
        currentSongName.innerHTML = songList[songIndex].musicName;
        getImges.src = songList[songIndex].songImg;
        getImges1.src = songList[songIndex].songImg;
        songArtiest.innerHTML = songList[songIndex].songWriter;
        audio.currentTime = 0;
        audio.play();
    }
});
// repeat Button of the music 
repeatBtn.addEventListener("click", ()=>{
    if(audio.loop != true){
    audio.loop = true;
    repeatBtn.style.background = "blue"
    repeatBtn.style.color = "black"
}else{
        audio.loop = false;
        repeatBtn.style.background = "black"
        repeatBtn.style.color = "white"

    }
})
updateBar.addEventListener("click",(event)=>{
    let progress = (event.offsetX / event.srcElement.clientWidth) * audio.duration;
    // console.log(progress);
    audio.currentTime = progress
})