/**
 * Secondary diarization which handles only the stopping of the entity
 */
class SlaveDiarization{

    recognition = new webkitSpeechRecognition();

    constructor(){
        this.recognition.grammars = new webkitSpeechGrammarList();
        this.recognition.continuous = true;
        this.recognition.lang = 'hu-HU'; /* userLang.contains('hu') || userLang.contains('en') ? userLang : 'hu-HU'; */ 
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
    }

    /**
     * Starts the recognition. If it recognise the stopping keyword, the stops the recording as well the recognition
     * @param {*} voiceRecorder 
     */
    diarization(voiceRecorder){
        var that = this;

        that.recognition.start();

        that.recognition.onresult = function(event){
            var last = event.results.length - 1;
            var result = event.results[last][0].transcript;
            console.log(result);

            if(result.includes("állj")){
                that.recognition.stop();
                voiceRecorder.stopRecording();
                
            }
        }
    }
}