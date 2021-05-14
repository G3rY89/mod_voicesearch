class JoomlaHelper {

    static playbackHandler;

    constructor(){
        this.playbackHandler = new PlaybackHandler();
    }

    getLangFromDB(lang){   
        var request = jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=getDBData&format=json',
            type: "post",
            async: false,
            data:{lang:lang}
        });
        request.done(function(response){
            return response;
        })
    }
 
    setVoicesearchStatusToSession(status){
        jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=setVoicesearchStatusToSession&format=json',
            type: "post",
            async: false,
            data:{status:status}
        });
    }
 
    getVoicesearchStatusFromSession(){
        var request = jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=getVoicesearchStatusFromSession&format=json',
            type: "post",
            async: false,
        });
        request.done(function(res){
            if(res.data == "true"){
                return res.data;
            }
        })
    }
 
    getTTS(reaction, recognition, TTS){
        var request = jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=getVoiceFromAPI&format=json',
            type: "post",
            async: false,
            data:{
                TTS:TTS,
                Langobject:langObject
            }
        });
        request.done(function(res){
            this.playbackHandler.play(res.data).then(function(){
                reaction(recognition);
            });
        })
    }
}