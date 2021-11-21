class JoomlaHelper {

    playbackHandler;
    slaveDiarization;
    voiceRecorder;

    constructor(){
        this.playbackHandler = new PlaybackHandler();
        this.slaveDiarization = new SlaveDiarization();
        this.voiceRecorder = new VoiceRecorder();
    }

    getLangFromDB(lang){
        return new Promise(function(resolve, reject){
            var request = jQuery.ajax({
                url: 'index.php?option=com_ajax&module=voicesearch&method=getDBData&format=json',
                type: "post",
                data:{lang:lang}
            });
            request.success(function(response){
                resolve(response);
            })
        })   
    }
 
    getTTS(reaction, recognition, TTS, langObject){
        var that = this;

        var request = jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=getVoiceFromAPI&format=json',
            type: "post",
            async: false,
            data:{
                TTS:TTS,
                Langobject:langObject
            }
        });
        request.success(function(response){
            that.voiceRecorder.startRecording();
            that.slaveDiarization.diarization(that.voiceRecorder);
            that.playbackHandler.play(response.data).then(function(){
                reaction(recognition);
            });
        }) 
    }
}