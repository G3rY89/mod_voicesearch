class FlashingHandler{
    
    constructor(){
        this.$voiceSearchButton = jQuery('#voicesearch');
    }

    setToBlue() {
        this.$voiceSearchButton.css({"-webkit-animation": "glowingBlue 2000ms infinite",
            "-moz-animation": "glowingBlue 2000ms infinite",
            "-o-animation": "glowingBlue 2000ms infinite"})
    }       

    setToRed() {
        this.$voiceSearchButton.css({"-webkit-animation": "glowingRed 2000ms infinite",
            "-moz-animation": "glowingRed 2000ms infinite",
            "-o-animation": "glowingRed 2000ms infinite"})
    };

    setToGreen() {
        this.$voiceSearchButton.css({"-webkit-animation": "glowingGreen 2000ms infinite",
            "-moz-animation": "glowingGreen 2000ms infinite",
            "-o-animation": "glowingGreen 2000ms infinite"})
    };

    setToOff() {
        this.$voiceSearchButton.css({"-webkit-animation": "",
        "-moz-animation": "",
        "-o-animation": ""})
    };
}