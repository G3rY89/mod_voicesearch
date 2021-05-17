class JoomlaHelper {

    playbackHandler;

    constructor(){
        this.playbackHandler = new PlaybackHandler();
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
 
    setVoicesearchStatusToSession(status){
        jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=setVoicesearchStatusToSession&format=json',
            type: "post",
            async: false,
            data:{status:status}
        });
    }
 
    getVoicesearchStatusFromSession(){
        return new Promise(function(resolve, reject){
            var request = jQuery.ajax({
                url: 'index.php?option=com_ajax&module=voicesearch&method=getVoicesearchStatusFromSession&format=json',
                type: "post"
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
            that.playbackHandler.play(response.data).then(function(){
                reaction(recognition);
            });
        }) 
    }
}