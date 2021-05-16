class Voicesearch {
    
    recognition = new webkitSpeechRecognition();
    userLang = navigator.language || navigator.userLanguage;
    langObject;
    dbLang; 
    tooltipHandler;
    joomlaHelper;
    flashingHandler;
    playbackHandler;

    constructor(){
        this.recognition.grammars = new webkitSpeechGrammarList();
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
        var that = this;

        this.joomlaHelper.getLangFromDB(this.dbLang).then(function(data){
            that.langObject = data.data[0];
        });

        if(that.joomlaHelper.getVoicesearchStatusFromSession()){
            that.startRecognition(true);
            that.flashingHandler.setToGreen();
        } else {
            that.tooltipHandler.showTooltipText("Hangvezérlés aktiválásához kattints ide!");
            setTimeout(function(){
                that.tooltipHandler.hideTooltipText();
            }, 3000);
            that.startRecognition(false);
        }
    }

    startRecognition(activated){
        var that = this;

        var activated = activated;

        that.recognition.start();

        that.recognition.onend = function(){
            that.recognition.stop();
            jQuery("#voicesearch").on("click", function(){
                start();
            })
        }

        that.recognition.onresult = function(event) {
            var last = event.results.length - 1;
            var result = event.results[last][0].transcript;
            console.log(result);
            
            if(activated){
                if(result.includes(that.langObject.searchkeyword)){
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.searchkeyword + " : " + result.replace(that.langObject.searchkeyword + " ", ""));
                    that.flashingHandler.setToRed();
                    that.joomlaHelper.getTTS(function(){
                        var searchfield = document.getElementById("searchkeyword");
                        searchfield.value = result.replace(that.langObject.searchkeyword + " ", "");
                        that.tooltipHandler.hideTooltipText();
                        that.recognition.start();
                        that.flashingHandler.setToGreen();
                    }, that.recognition, that.langObject.searchkeyword + " : " + result.replace(that.langObject.searchkeyword + " ", ""))
                } else if(result.includes(that.langObject.category)){
                    var resultFounded = false;
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.category + " : " + result.toLowerCase().replace(that.langObject.category + " ", ""));
                    that.flashingHandler.setToRed();
                    that.joomlaHelper.getTTS(function(){
                        $options = jQuery("#categories option");
                        $options.each(function(i){
                            if($options[i].text.toLowerCase().indexOf(result.toLowerCase().replace(that.langObject.category + " ", "")) >= 0){
                                jQuery($options[i]).prop('selected',true);
                                jQuery("#categories").trigger("chosen:updated");
                                resultFounded = true;
                            };
                        })
                        if(!resultFounded){
                            that.recognition.stop();
                            that.tooltipHandler.showTooltipText(that.langObject.sorry + that.langObject.category + that.langObject.no_result + result.toLowerCase().replace(that.langObject.category + " ", ""));
                            that.flashingHandler.setToRed();
                            that.joomlaHelper.getTTS(function(){
                                that.tooltipHandler.hideTooltipText();
                                that.recognition.start();
                                that.flashingHandler.setToGreen();
                            }, that.recognition, that.langObject.sorry + that.langObject.category + that.langObject.no_result + result.toLowerCase().replace(that.langObject.category + " ", ""));
                        } else {
                            that.tooltipHandler.hideTooltipText();
                            that.recognition.start();
                            that.flashingHandler.setToGreen();
                        }
                    }, that.recognition, that.langObject.category + " : " + result.toLowerCase().replace(that.langObject.category + " ", "")); 
                
                } else if(result.includes(that.langObject.zip)){
                    that.recognition.stop();
                    that.flashingHandler.setToRed();
                    that.tooltipHandler.showTooltipText(that.langObject.zip + " : " + result.replace(that.langObject.zip + " ", ""));
                    that.joomlaHelper.getTTS(function(){
                        var ZIP = document.getElementById("zipcode");
                        ZIP.value = result.replace(that.langObject.zip + " ", "");
                        that.tooltipHandler.hideTooltipText();
                        that.recognition.start();
                        that.flashingHandler.setToGreen();
                    }, that.recognition, that.langObject.zip + " : " + result.replace(that.langObject.zip + " ", ""));
                } else if(result.toLowerCase().includes(that.langObject.city)){
                    var resultFounded = false;
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.city + " : " + result.replace(that.langObject.city + " ", ""));
                    that.flashingHandler.setToRed();
                    that.joomlaHelper.getTTS(function(){
                        $cities = jQuery("#citySearch option");
                        $cities.each(function(i){
                            if($cities[i].text.indexOf(result.replace(that.langObject.city + " ", "")) >= 0){
                                jQuery($cities[i]).prop('selected',true);
                                jQuery("#citySearch").trigger("chosen:updated");
                                resultFounded = true;
                            }
                        })
                        if(!resultFounded){
                            that.recognition.stop();
                            that.tooltipHandler.showTooltipText(that.langObject.sorry + that.langObject.city + that.langObject.no_result + result.replace(that.langObject.city + " ", ""));
                            that.flashingHandler.setToRed();
                            that.joomlaHelper.getTTS(function(){
                                that.tooltipHandler.hideTooltipText();
                                that.recognition.start();
                                that.flashingHandler.setToGreen();
                            }, that.recognition, that.langObject.sorry + that.langObject.city + that.langObject.no_result + result.replace(that.langObject.city + " ", ""));
                        } else {
                            that.tooltipHandler.hideTooltipText();
                            that.recognition.start();
                            that.flashingHandler.setToGreen();
                        }
                    }, that.recognition, that.langObject.city + " : " + result.replace(that.langObject.city + " ", ""));
                } else if(result.includes(that.langObject.search)){
                    document.getElementById("keywordSearch").submit();
                } else if(result.includes(that.langObject.stop)) {
                    that. recognition.stop();
                    that.flashingHandler.setToOff();
                } else if(result.includes(that.langObject.scroll_down)){
                    window.scrollBy(0, window.innerHeight);
                } else if(result.includes(that.langObject.scroll_up)){
                    window.scrollBy(0, -window.innerHeight);
                } else {
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(langObject.error + result);
                    that.flashingHandler.setToRed()
                    that.joomlaHelper.getTTS(function(){
                        that.recognition.start();
                        that.flashingHandler.setToGreen();
                        that.tooltipHandler.hideTooltipText();
                    }, that.recognition, that.langObject.error + result);
                }
            }
            if(result.includes(that.langObject.stop)){ 
                that.recognition.stop();
                that.tooltipHandler.showTooltipText(that.langObject.goodbye);
                that.joomlaHelper.getTTS(function(){
                    that.flashingHandler.setToOff();
                    that.tooltipHandler.hideTooltipText();
                }, that.recognition, that.langObject.goodbye);
            } else if(result.includes(that.langObject.start)){
                that.recognition.stop();
                that.flashingHandler.setToRed();
                that.joomlaHelper.setVoicesearchStatusToSession(true);
                that.tooltipHandler.showTooltipText(that.langObject.greeting);
                that.joomlaHelper.getTTS(function(){
                    that.flashingHandler.setToGreen();
                    that.tooltipHandler.hideTooltipText();
                    that.recognition.start();
                    activated = true;
                }, that.recognition, that.langObject.greeting);
            }
        }
    }
}