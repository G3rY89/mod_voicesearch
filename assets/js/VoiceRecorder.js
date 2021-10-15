class VoiceRecorder {

    gumStream;
    rec;
    input;

    constructor(){

    }    

    startRecording() {
        var that = this;
        console.log("recording started");

        var constraints = { audio: true, video:false }

        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

            var audioContext = new AudioContext();
            that.gumStream = stream;
            that.input = audioContext.createMediaStreamSource(stream);
            that.rec = new Recorder(input,{numChannels:1})
            that.rec.record()
            console.log("Recording started");

        }).catch(function(err) {
            console.log(err);
        });
    }

    pauseRecording(){
        var that = this;
        if (rec.recording){
            that.rec.stop();
        }else{
            that.rec.record();
        }
    }

    stopRecording() {
        var that = this;
        console.log("recording stopped");
        
        that.rec.stop();
        that.gumStream.getAudioTracks()[0].stop();

        that.rec.exportWAV(createDownloadLink);
    }

    uploadFileForDiarization(blob) {

        //var filename = new Date().toISOString();

        var xhr=new XMLHttpRequest();
        xhr.onload=function(e) {
            if(this.readyState === 4) {
                console.log("Server returned: ",e.target.responseText);
            }
        };
        //var fd=new FormData();
        //fd.append("audio_data",blob, filename);
        xhr.open("POST","https://dev-diarization.herokuapp.com/recognize",true);
        xhr.send(blob);
    }
}