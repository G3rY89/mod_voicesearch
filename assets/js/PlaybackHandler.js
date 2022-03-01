/**
 * Handles the playback of sounds
 */
class PlaybackHandler{
    
    constructor(){
    }

    /**
     * play a given audio in base64 string
     * @param {*} url 
     * @returns Promise
     */
    play(sound) {
        return new Promise(function(resolve, reject) {
            var audio = new Audio();
            audio.preload = "auto";
            audio.autoplay = true;
            audio.onerror = reject;
            audio.onended = resolve;
            audio.src = sound
        });
    }
}