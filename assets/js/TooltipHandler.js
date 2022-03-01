/**
 * Handles the popup messages of the enity
 */
class TooltipHandler {

    static tooltipContainer;
    static tooltipText;

    constructor(){
        this.tooltipContainer = jQuery(".tooltip1 .tooltiptext1");
        this.tooltipText = jQuery(".tooltiptext1");
    }

    /**
     * Shows up the popup message with the given text
     * @param {*} tooltiptext 
     */
    showTooltipText(tooltiptext){
        this.tooltipContainer.css({
            'visibility' :'visible',
            'opacity': 1,
        });
        this.tooltipText.text('');
        this.tooltipText.text(tooltiptext);
    }

    /**
     * Hides the shown popup message
     */
    hideTooltipText(){
        this.tooltipContainer.css({
            'visibility' :'hidden',
            'opacity': 0,
        });
    }
}