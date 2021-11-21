class VoiceRecorder {
    mediaRecorder;
    recordedBlobs = [];
    sourceBuffer;

    constructor(){
        
    }

    startRecording() {
      var that = this;

      var options = {mimeType: 'audio/webm'};

      var constraints = {
        audio: true,
        video: false
      };

      that.recordedBlobs = [];

      navigator.mediaDevices.getUserMedia(
        constraints
      ).then(function(stream){
        try {
          that.mediaRecorder = new MediaRecorder(stream, options);
        } catch (e0) {
          console.log('Unable to create MediaRecorder with options Object: ', e0);
          try {
            options = {mimeType: 'audio/wav'};
            that.mediaRecorder = new MediaRecorder(stream, options);
          } catch (e1) {
            console.log('Unable to create MediaRecorder with options Object: ', e1);
            try {
              options = 'audio/wav'; // Chrome 47
              that.mediaRecorder = new MediaRecorder(stream, options);
            } catch (e2) {
              alert('MediaRecorder is not supported by this browser.\n\n' +
                  'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
              console.error('Exception while creating MediaRecorder:', e2);
              return;
            }
          }
        }
        console.log('Created MediaRecorder', that.mediaRecorder, 'with options', options);
        that.mediaRecorder.onstop = that.stopRecording;
        that.mediaRecorder.ondataavailable = function(event){
          if (event.data && event.data.size > 0) {
            that.recordedBlobs.push(event.data);
          }
        };
        that.mediaRecorder.start(10); // collect 10ms of data
        console.log('MediaRecorder started', that.mediaRecorder);
      },
        that.successCallback,
        that.errorCallback
      );
    }
    
    stopRecording() {
      var that = this;
      that.mediaRecorder.stop();

      that.uploadFileForDiarization(that.recordedBlobs);
    }

    uploadFileForDiarization(blob) {
          
      var xhr=new XMLHttpRequest();
      xhr.onload=function(e) {
          if(this.readyState === 4) {
              console.log("Server returned: ",xhr.response);
          }
      };
      xhr.open("POST","https://dev-diarization.herokuapp.com/recognize",true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader("VoiceAssistantName", "Mate");
      xhr.setRequestHeader("Content-Type", "audio/wave");
      xhr.send(blob);
    }

    successCallback(stream) {
      console.log('getUserMedia() got stream: ', stream);
      window.stream = stream;
    }
    
    errorCallback(error) {
      console.log('navigator.getUserMedia error: ', error);
    }

    /* handleDataAvailable(event) {
      var that = this;
      if (event.data && event.data.size > 0) {
        that.recordedBlobs.push(event.data);
      }
    } */
}

