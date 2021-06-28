class Voicesearch {
    
    recognition = new webkitSpeechRecognition();
    userLang = navigator.language || navigator.userLanguage;
    langObject;
    dbLang; 
    tooltipHandler;
    joomlaHelper;
    flashingHandler;
    playbackHandler;
    resultHandler;
    voiceSearchStatus;
    readResults;

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

        this.emptySessionStorage();
    };

    start(){
        var that = this;

        that.voiceSearchStatus = sessionStorage.getItem('voicesearchstatus');
        that.readResults = sessionStorage.getItem('readresults');

        this.joomlaHelper.getLangFromDB(this.dbLang).then(function(response){
            that.langObject = response.data[0];
            if(that.voiceSearchStatus == "true") {
                if(that.readResults == "true"){
                    that.flashingHandler.setToBlue();
                    that.resultHandler = new ResultHandler();
                    that.joomlaHelper.getTTS(function(){
                        that.startRecognition(true);
                        that.flashingHandler.setToGreen();
                    }, that.recognition, that.langObject.featured_results + that.resultHandler.getFeaturedResultsCompanyNames(), that.langObject)
                } else {
                    that.flashingHandler.setToGreen();
                    that.startRecognition(true);
                }
            } else {
                that.tooltipHandler.showTooltipText("Hangvezérlés aktiválásához kattints ide!");
                setTimeout(function(){
                    that.tooltipHandler.hideTooltipText();
                }, 3000);
                that.startRecognition(false);
            }
        });
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
                    }, that.recognition, that.langObject.searchkeyword + " : " + result.replace(that.langObject.searchkeyword + " ", ""), that.langObject)
                } else if(result.includes(that.langObject.category)){
                    var resultFounded = false;
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.category + " : " + result.toLowerCase().replace(that.langObject.category + " ", ""));
                    that.flashingHandler.setToRed();
                    that.joomlaHelper.getTTS(function(){
                        var $options = jQuery("#categories option");
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
                            }, that.recognition, that.langObject.sorry + that.langObject.category + that.langObject.no_result + result.toLowerCase().replace(that.langObject.category + " ", ""), that.langObject);
                        } else {
                            that.tooltipHandler.hideTooltipText();
                            that.recognition.start();
                            that.flashingHandler.setToGreen();
                        }
                    }, that.recognition, that.langObject.category + " : " + result.toLowerCase().replace(that.langObject.category + " ", ""), that.langObject); 
                
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
                    }, that.recognition, that.langObject.zip + " : " + result.replace(that.langObject.zip + " ", ""), that.langObject);
                } else if(result.toLowerCase().includes(that.langObject.city)){
                    var resultFounded = false;
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.city + " : " + result.replace(that.langObject.city + " ", ""));
                    that.flashingHandler.setToRed();
                    that.joomlaHelper.getTTS(function(){
                        var $cities = jQuery("#citySearch option");
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
                            }, that.recognition, that.langObject.sorry + that.langObject.city + that.langObject.no_result + result.replace(that.langObject.city + " ", ""), that.langObject);
                        } else {
                            that.tooltipHandler.hideTooltipText();
                            that.recognition.start();
                            that.flashingHandler.setToGreen();
                        }
                    }, that.recognition, that.langObject.city + " : " + result.replace(that.langObject.city + " ", ""), that.langObject);
                } else if(result.includes(that.langObject.search)){
                    sessionStorage.setItem('readresults', true);
                    document.getElementById("keywordSearch").submit();
                } else if(result.includes(that.langObject.stop)) {
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.goodbye);
                    sessionStorage.setItem('voicesearchstatus', false);
                    sessionStorage.setItem('readresults', false);
                    that.joomlaHelper.getTTS(function(){
                        that.flashingHandler.setToOff();
                        that.tooltipHandler.hideTooltipText();
                    }, that.recognition, that.langObject.goodbye, that.langObject);
                } else if(that.voiceSearchStatus && result.includes(that.langObject.result)) {
                    that.recognition.stop();
                    that.resultHandler.getNthResult(result.replace(/[^0-9]/g,'')).then(function(response){
                    that.tooltipHandler.showTooltipText(response);
                    that.flashingHandler.setToRed();
                        that.joomlaHelper.getTTS(function(){
                            that.recognition.start();
                            that.flashingHandler.setToGreen();
                            that.tooltipHandler.hideTooltipText();
                        }, that.recognition, response, that.langObject)
                    })
                } else if(result.includes(that.langObject.scroll_down)){
                    window.scrollBy(0, window.innerHeight);
                } else if(result.includes(that.langObject.scroll_up)){
                    window.scrollBy(0, -window.innerHeight);
                } else {
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.error + result);
                    that.flashingHandler.setToRed()
                    that.joomlaHelper.getTTS(function(){
                        that.recognition.start();
                        that.flashingHandler.setToGreen();
                        that.tooltipHandler.hideTooltipText();
                    }, that.recognition, that.langObject.error + result, that.langObject);
                }
            } else {
                if(result.includes(that.langObject.stop)){ 
                    that.recognition.stop();
                    that.tooltipHandler.showTooltipText(that.langObject.goodbye);
                    sessionStorage.setItem('voicesearchstatus', false);
                    sessionStorage.setItem('readresults', false);
                    that.joomlaHelper.getTTS(function(){
                        that.flashingHandler.setToOff();
                        that.tooltipHandler.hideTooltipText();
                    }, that.recognition, that.langObject.goodbye, that.langObject);
                } else if(result.includes(that.langObject.start)){
                    that.recognition.stop();
                    that.flashingHandler.setToRed();
                    sessionStorage.setItem('voicesearchstatus', true);
                    that.tooltipHandler.showTooltipText(that.langObject.greeting);
                    that.joomlaHelper.getTTS(function(){
                        that.flashingHandler.setToGreen();
                        that.tooltipHandler.hideTooltipText();
                        that.recognition.start();
                        activated = true;
                    }, that.recognition, that.langObject.greeting, that.langObject);
                }
            }
        }
    }

    emptySessionStorage() {
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            sessionStorage.clear();
        }
    }
}