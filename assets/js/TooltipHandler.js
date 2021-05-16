class TooltipHandler {

    static tooltipContainer;
    static tooltipText;

    constructor(){
        this.tooltipContainer = jQuery(".tooltip1 .tooltiptext1");
        this.tooltipText = jQuery(".tooltiptext1");
    }

    showTooltipText(tooltiptext){
        this.tooltipContainer.css({
            'visibility' :'visible',
            'opacity': 1,
        });

        this.tooltipText.text(tooltiptext);
    }

    hideTooltipText(){
        this.tooltipContainer.css({
            'visibility' :'hidden',
            'opacity': 0,
        });
    }
}