<?php
/**
 * Voice search Module Entry Point
 */

// No direct access
defined('_JEXEC') or die;
// Include the syndicate functions only once
require_once dirname(__FILE__) . '/helper.php';

$voicesearch = ModVoiceSearchHelper::getVoiceSearch($params);
require JModuleHelper::getLayoutPath('mod_voicesearch');
?>

<script type="text/javascript">

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var langObject = null;

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    var userLang = navigator.language || navigator.userLanguage; 

    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'hu-HU'; /* userLang.contains('hu') || userLang.contains('en') ? userLang : 'hu-HU'; */ 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var dbLang = recognition.lang.contains('hu') ? 'hu' : 'en';

    function start(){
        getLangFromDB(dbLang);
    }

    function startRecognition(){
        var activated = false;
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
                    showTooltipText(langObject.searchkeyword + " : " + result.replace(langObject.searchkeyword + " ", ""));
                    setToRed();
                    getTTS(function(recognition){
                        var searchfield = document.getElementById("searchkeyword");
                        searchfield.value = result.replace(langObject.searchkeyword + " ", "");
                        hideTooltipText();
                        recognition.start();
                        setToGreen();
                    }, recognition, langObject.searchkeyword + " : " + result.replace(langObject.searchkeyword + " ", ""))
                } else if(result.includes(langObject.category)){
                    var resultFounded = false;
                    recognition.stop();
                    showTooltipText(langObject.category + " : " + result.toLowerCase().replace(langObject.category + " ", ""));
                    setToRed();
                    getTTS(function(recognition){
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
                            showTooltipText(langObject.sorry + langObject.category + langObject.no_result + result.toLowerCase().replace(langObject.category + " ", ""));
                            setToRed();
                            getTTS(function(recognition){
                                hideTooltipText();
                                recognition.start();
                                setToGreen();
                            }, recognition, langObject.sorry + langObject.category + langObject.no_result + result.toLowerCase().replace(langObject.category + " ", ""));
                        } else {
                            hideTooltipText();
                            recognition.start();
                            setToGreen();
                        }
                    }, recognition, langObject.category + " : " + result.toLowerCase().replace(langObject.category + " ", "")); 
                   
                } else if(result.includes(langObject.zip)){
                    recognition.stop();
                    setToRed();
                    showTooltipText(langObject.zip + " : " + result.replace(langObject.zip + " ", ""));
                    getTTS(function(recognition){
                        var ZIP = document.getElementById("zipcode");
                        ZIP.value = result.replace(langObject.zip + " ", "");
                        hideTooltipText();
                        recognition.start();
                        setToGreen();
                    }, recognition, langObject.zip + " : " + result.replace(langObject.zip + " ", ""));
                } else if(result.toLowerCase().includes(langObject.city)){
                    var resultFounded = false;
                    recognition.stop();
                    showTooltipText(langObject.city + " : " + result.replace(langObject.city + " ", ""));
                    setToRed();
                    getTTS(function(recognition){
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
                            showTooltipText(langObject.sorry + langObject.city + langObject.no_result + result.replace(langObject.city + " ", ""));
                            setToRed();
                            getTTS(function(recognition){
                                hideTooltipText();
                                recognition.start();
                                setToGreen();
                            }, recognition, langObject.sorry + langObject.city + langObject.no_result + result.replace(langObject.city + " ", ""));
                        } else {
                            hideTooltipText();
                            recognition.start();
                            setToGreen();
                        }
                    }, recognition, langObject.city + " : " + result.replace(langObject.city + " ", ""));
                } else if(result.includes(langObject.search)){
                    document.getElementById("keywordSearch").submit();
                } else if(result.includes(langObject.stop)) {
                    recognition.stop();
                    setToOff();
                } else if(result.includes(langObject.scroll_down)){
                    window.scrollBy(0, window.innerHeight);
                } else if(result.includes(langObject.scroll_up)){
                    window.scrollBy(0, -window.innerHeight);
                } else {
                    recognition.stop();
                    showTooltipText(langObject.error + result);
                    setToRed()
                    getTTS(function(){
                        recognition.start();
                        setToGreen();
                        hideTooltipText();
                    }, recognition, langObject.error + result);
                }
            }
            if(result.includes(langObject.stop)){ 
                recognition.stop();
                showTooltipText(langObject.goodbye);
                getTTS(function(recognition){
                    setToOff();
                    hideTooltipText();
                }, recognition, langObject.goodbye);
            } else if(result.includes(langObject.start)){
                recognition.stop();
                setToRed();
                showTooltipText(langObject.greeting);
                getTTS(function(recognition){
                    setToGreen();
                    hideTooltipText();
                    recognition.start();
                    activated = true;
                }, recognition, langObject.greeting);
            }
        }
    }

    function showTooltipText(tooltiptext){
        jQuery(".tooltip1 .tooltiptext1").css({
            'visibility' :'visible',
            'opacity': 1,
        });

        jQuery(".tooltiptext1").text(tooltiptext);
    }

    function hideTooltipText(){
        jQuery(".tooltip1 .tooltiptext1").css({
            'visibility' :'hidden',
            'opacity': 0,
        });
    }

    function getLangFromDB(lang){   
       var request = jQuery.ajax({
            url: 'index.php?option=com_ajax&module=voicesearch&method=getDBData&format=json',
            type: "post",
            async: false,
            data:{lang:lang}
        });
        request.done(function(res){
            langObject = res.data[0];
            startRecognition();
        })
    }

    function getTTS(reaction, recognition, TTS){
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
            play(res.data).then(function(){
                reaction(recognition);
            });
        })
    }

    var voiceSearchImage = document.getElementById('voicesearch');

    var setToBlue =  function () {
        jQuery('#voicesearch').css({"-webkit-animation": "glowingBlue 2000ms infinite",
            "-moz-animation": "glowingBlue 2000ms infinite",
            "-o-animation": "glowingBlue 2000ms infinite"})
    }       

    var setToRed = function() {
        jQuery('#voicesearch').css({"-webkit-animation": "glowingRed 2000ms infinite",
            "-moz-animation": "glowingRed 2000ms infinite",
            "-o-animation": "glowingRed 2000ms infinite"})
    };

    var setToGreen = function() {
        jQuery('#voicesearch').css({"-webkit-animation": "glowingGreen 2000ms infinite",
            "-moz-animation": "glowingGreen 2000ms infinite",
            "-o-animation": "glowingGreen 2000ms infinite"})
    };

    var setToOff = function() {
        jQuery('#voicesearch').css({"-webkit-animation": "",
        "-moz-animation": "",
        "-o-animation": ""})
    };

    function play(url) {
        return new Promise(function(resolve, reject) {
            var audio = new Audio();
            audio.preload = "auto";
            audio.autoplay = true;
            audio.onerror = reject;
            audio.onended = resolve;
            audio.src = url
        });
    }

    jQuery(document).ready(function(){
        var $voiceSearchButton = jQuery("#voicesearch");

        showTooltipText("Hangvezérlés aktiválásához kattints ide!");
        setTimeout(function(){
            hideTooltipText()
        }, 3000);

    })
    
</script>

<style>
    .allie-logo{
        width: 100px;
        border-radius: 25%;
        color: #FFFFFF;
    }

    .tooltip1 {
        position: relative;
        display: inline-block;
        margin-left: auto; 
        margin-right: auto; 
        margin-top: auto;
        margin-bottom: auto;
    }

    .tooltiptext1 {
        visibility: hidden;
        width: auto;
        border-radius: 6px;
        color: #fff;
        text-align: center;
        padding: 5px;
       
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;

        opacity: 0;
        transition: opacity 0.3s;

        background-color: #555;
    }

    .tooltiptext1::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .tooltip1:hover .tooltiptext1 {
        visibility: visible;
        opacity: 1;
    }

    @-webkit-keyframes glowingBlue {
    0% { background-color: transparent; -webkit-box-shadow: 0 0 3px 10px transparent; }
    50% { background-color: blue; -webkit-box-shadow: 0 0 20px 20px blue; }
    100% { background-color: transparent; -webkit-box-shadow: 0 0 3px transparent; }
    }

    @-moz-keyframes glowingBlue {
        0% { background-color: transparent; -moz-box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: blue; -moz-box-shadow: 0 0 20px 20px blue; }
        100% { background-color: transparent; -moz-box-shadow: 0 0 3px transparent; }
    }

    @-o-keyframes glowingBlue {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: blue; box-shadow: 0 0 20px 20px blue; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }

    @keyframes glowingBlue {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: blue; box-shadow: 0 0 20px 20px blue; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }

    @-webkit-keyframes glowingRed {
        0% { background-color: transparent; -webkit-box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: red; -webkit-box-shadow: 0 0 20px 20px red; }
        100% { background-color: transparent; -webkit-box-shadow: 0 0 3px transparent; }
    }

    @-moz-keyframes glowingRed {
        0% { background-color: transparent; -moz-box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: red; -moz-box-shadow: 0 0 20px 20px red; }
        100% { background-color: transparent; -moz-box-shadow: 0 0 3px transparent; }
    }

    @-o-keyframes glowingRed {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: red; box-shadow: 0 0 20px 20px red; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }

    @keyframes glowingRed {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: red; box-shadow: 0 0 20px 20px red; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }

    @-webkit-keyframes glowingGreen {
        0% { background-color: transparent; -webkit-box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: green; -webkit-box-shadow: 0 0 20px 20px green; }
        100% { background-color: transparent; -webkit-box-shadow: 0 0 3px transparent; }
    }

    @-moz-keyframes glowingGreen {
        0% { background-color: transparent; -moz-box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: green; -moz-box-shadow: 0 0 20px 20px green; }
        100% { background-color: transparent; -moz-box-shadow: 0 0 3px transparent; }
    }

    @-o-keyframes glowingGreen {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: green; box-shadow: 0 0 20px 20px green; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }

    @keyframes glowingGreen {
        0% { background-color: transparent; box-shadow: 0 0 3px 10px transparent; }
        50% { background-color: green; box-shadow: 0 0 20px 20px green; }
        100% { background-color: transparent; box-shadow: 0 0 3px transparent; }
    }
</style>