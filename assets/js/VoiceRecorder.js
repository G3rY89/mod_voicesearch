class VoiceRecorder {

    gumStream;
    rec;
    input;

    constructor(){
        URL = window.URL || window.webkitURL;

        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext
    }    

    startRecording() {
        console.log("recording started");

        var constraints = { audio: true, video:false }

        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

            audioContext = new AudioContext();
            document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
            gumStream = stream;
            input = audioContext.createMediaStreamSource(stream);
            rec = new Recorder(input,{numChannels:1})
            rec.record()
            console.log("Recording started");

        }).catch(function(err) {
            console.log(err);
        });
    }

    pauseRecording(){
        console.log("pauseButton clicked rec.recording=",rec.recording );
        if (rec.recording){
            rec.stop();
        }else{
            rec.record();
        }
    }

    stopRecording() {
        console.log("recording stopped");
        
        rec.stop();
        gumStream.getAudioTracks()[0].stop();

        rec.exportWAV(createDownloadLink);
    }

    uploadFileForDiarization(blob) {

        var filename = new Date().toISOString();
        
        var upload = document.createElement('a');
        upload.href="#";
        upload.innerHTML = "Upload";
        upload.addEventListener("click", function(event){
            var xhr=new XMLHttpRequest();
            xhr.onload=function(e) {
                if(this.readyState === 4) {
                    console.log("Server returned: ",e.target.responseText);
                }
            };
            var fd=new FormData();
            fd.append("audio_data",blob, filename);
            xhr.open("POST","upload.php",true);
            xhr.send(fd);
        })
    }
}