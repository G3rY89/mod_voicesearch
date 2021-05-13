var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'hu-HU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startRecognition(){
    recognition.start();

    recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var result = event.results[last][0].transcript;

        if(result.includes("kulcsszó")){
            var searchfield = document.getElementById("searchkeyword");
            searchfield.value = result.replace("kulcsszó ", "");
        } else if(result.includes("kategória")){
            var $categories = $("#categories");
            $categories.each(function(){
                if(this.text() == result.replace("kategória ", "")){
                    this.prop('selected', true);
                    $categories.trigger("chosen:updated")
            };
        })
        } else if(result.includes("irányítószám")){
            var ZIP = document.getElementById("zipcode");
            ZIP.value = result.replace("irányítószám ", "");
        } else if(result.includes("város")){
            var $cities = $("#citySearch");
            Array.from($cities.options).forEach(function(option_element) {
                if(option_element.text == result.replace("város ", "")){
                    option_element.selected = "selected";
                    $cities.trigger("chosen:updated")
                }    
            });
        } else if(result.includes("keresés")){
            document.getElementById("keywordSearch").submit();
        }
        if(result.includes("stop")){
            recognition.stop();
        }
    }
};