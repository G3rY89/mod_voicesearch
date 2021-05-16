class PlaybackHandler{
    
    constructor(){
    }

    play(url) {
        return new Promise(function(resolve, reject) {
            var audio = new Audio();
            audio.preload = "auto";
            audio.autoplay = true;
            audio.onerror = reject;
            audio.onended = resolve;
            audio.src = url
        });
    }
}