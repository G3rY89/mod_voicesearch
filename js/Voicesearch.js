class Voicesearch {
    
    static SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    static SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    static langObject;

    static recognition = new SpeechRecognition();
    static speechRecognitionList = new SpeechGrammarList();
    static userLang = navigator.language || navigator.userLanguage;
    static dbLang; 
    static tooltipHandler;
    static joomlaHelper;
    static flashingHandler;
    static playbackHandler;

    constructor(){
        this.recognition.grammars = speechRecognitionList;
        this.recognition.continuous = true;
        this.recognition.lang = 'hu-HU'; /* userLang.contains('hu') || userLang.contains('en') ? userLang : 'hu-HU'; */ 
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.dbLang = this.recognition.lang.contains('hu') ? 'hu' : 'en';
        this.tooltipHandler = new TooltipHandler();
        this.joomlaHelper = new JoomlaHelper();
        this.flashingHandler = new FlashingHandler();
    };

    start(){
        var response = this.joomlaHelper.getLangFromDB(this.dbLang);
        this.langObject = response.data[0];

        if(this.joomlaHelper.getVoicesearchStatusFromSession()){
            this.startRecognition(true);
            this.flashingHandler.setToGreen();
        } else {
            this.tooltipHandler.showTooltipText("Hangvezérlés aktiválásához kattints ide!");
            setTimeout(function(){
                this.tooltipHandler.hideTooltipText();
            }, 3000);
            this.startRecognition(false);
        }
    }

    startRecognition(activated){
        var activated = activated;
        recognition.start();

        recognition.onend = function(){
            recognition.stop();
            jQuery("#voicesearch").on("click", function(){
                start();
            })
        }

        recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var result = event.results[last][0].transcript;
            console.log(result);
            
            if(activated){
                if(result.includes(langObject.searchkeyword)){
                    recognition.stop();
                    this.tooltipHandler.showTooltipText(langObject.searchkeyword + " : " + result.replace(langObject.searchkeyword + " ", ""));
                    this.flashingHandler.setToRed();
                    this.joomlaHelper.getTTS(function(recognition){
                        var searchfield = document.getElementById("searchkeyword");
                        searchfield.value = result.replace(langObject.searchkeyword + " ", "");
                        tooltipHandler.hideTooltipText();
                        recognition.start();
                        this.flashingHandler.setToGreen();
                    }, recognition, langObject.searchkeyword + " : " + result.replace(langObject.searchkeyword + " ", ""))
                } else if(result.includes(langObject.category)){
                    var resultFounded = false;
                    recognition.stop();
                    tooltipHandler.showTooltipText(langObject.category + " : " + result.toLowerCase().replace(langObject.category + " ", ""));
                    this.flashingHandler.setToRed();
                    this.joomlaHelper.getTTS(function(recognition){
                        $options = jQuery("#categories option");
                        $options.each(function(i){
                            if($options[i].text.toLowerCase().indexOf(result.toLowerCase().replace(langObject.category + " ", "")) >= 0){
                                jQuery($options[i]).prop('selected',true);
                                jQuery("#categories").trigger("chosen:updated");
                                resultFounded = true;
                            };
                        })
                        if(!resultFounded){
                            recognition.stop();
                            this.tooltipHandler.showTooltipText(langObject.sorry + langObject.category + langObject.no_result + result.toLowerCase().replace(langObject.category + " ", ""));
                            this.flashingHandler.setToRed();
                            this.joomlaHelper.getTTS(function(recognition){
                                this.tooltipHandler.hideTooltipText();
                                recognition.start();
                                this.flashingHandler.setToGreen();
                            }, recognition, langObject.sorry + langObject.category + langObject.no_result + result.toLowerCase().replace(langObject.category + " ", ""));
                        } else {
                            this.tooltipHandler.hideTooltipText();
                            recognition.start();
                            this.flashingHandler.setToGreen();
                        }
                    }, recognition, langObject.category + " : " + result.toLowerCase().replace(langObject.category + " ", "")); 
                   
                } else if(result.includes(langObject.zip)){
                    recognition.stop();
                    this.flashingHandler.setToRed();
                    this.tooltipHandler.showTooltipText(langObject.zip + " : " + result.replace(langObject.zip + " ", ""));
                    this.joomlaHelper.getTTS(function(recognition){
                        var ZIP = document.getElementById("zipcode");
                        ZIP.value = result.replace(langObject.zip + " ", "");
                        tooltipHandler.hideTooltipText();
                        recognition.start();
                        this.flashingHandler.setToGreen();
                    }, recognition, langObject.zip + " : " + result.replace(langObject.zip + " ", ""));
                } else if(result.toLowerCase().includes(langObject.city)){
                    var resultFounded = false;
                    recognition.stop();
                    this.tooltipHandler.showTooltipText(langObject.city + " : " + result.replace(langObject.city + " ", ""));
                    this.flashingHandler.setToRed();
                    this.joomlaHelper.getTTS(function(recognition){
                        $cities = jQuery("#citySearch option");
                        $cities.each(function(i){
                            if($cities[i].text.indexOf(result.replace(langObject.city + " ", "")) >= 0){
                                jQuery($cities[i]).prop('selected',true);
                                jQuery("#citySearch").trigger("chosen:updated");
                                resultFounded = true;
                            }
                        })
                        if(!resultFounded){
                            recognition.stop();
                            this.tooltipHandler.showTooltipText(langObject.sorry + langObject.city + langObject.no_result + result.replace(langObject.city + " ", ""));
                            this.flashingHandler.setToRed();
                            this.joomlaHelper.getTTS(function(recognition){
                                tooltipHandler.hideTooltipText();
                                recognition.start();
                                this.flashingHandler.setToGreen();
                            }, recognition, langObject.sorry + langObject.city + langObject.no_result + result.replace(langObject.city + " ", ""));
                        } else {
                            this.tooltipHandler.hideTooltipText();
                            recognition.start();
                            this.flashingHandler.setToGreen();
                        }
                    }, recognition, langObject.city + " : " + result.replace(langObject.city + " ", ""));
                } else if(result.includes(langObject.search)){
                    document.getElementById("keywordSearch").submit();
                } else if(result.includes(langObject.stop)) {
                    recognition.stop();
                    this.flashingHandler.setToOff();
                } else if(result.includes(langObject.scroll_down)){
                    window.scrollBy(0, window.innerHeight);
                } else if(result.includes(langObject.scroll_up)){
                    window.scrollBy(0, -window.innerHeight);
                } else {
                    recognition.stop();
                    this.tooltipHandler.showTooltipText(langObject.error + result);
                    this.flashingHandler.setToRed()
                    this.joomlaHelper.getTTS(function(){
                        recognition.start();
                        this.flashingHandler.setToGreen();
                        this.tooltipHandler.hideTooltipText();
                    }, recognition, langObject.error + result);
                }
            }
            if(result.includes(langObject.stop)){ 
                recognition.stop();
                this.tooltipHandler.showTooltipText(langObject.goodbye);
                this.joomlaHelper.getTTS(function(recognition){
                    this.flashingHandler.setToOff();
                    this.tooltipHandler.hideTooltipText();
                }, recognition, langObject.goodbye);
            } else if(result.includes(langObject.start)){
                recognition.stop();
                setToRed();
                this.joomlaHelper.setVoicesearchStatusToSession(true);
                this.tooltipHandler.showTooltipText(langObject.greeting);
                this.joomlaHelper.getTTS(function(recognition){
                    setToGreen();
                    this.tooltipHandler.hideTooltipText();
                    recognition.start();
                    activated = true;
                }, recognition, langObject.greeting);
            }
        }
    }
}