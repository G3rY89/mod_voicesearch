class ResultHandler{

    featuredResultList;

    constructor(){
        this.featuredResultList = this.getFeaturedResults();
    }

    getFeaturedResults(){
        var featuredResultList = [];

        var results = jQuery("#results-container");
        if(results != null){
           var resultContainer = $(results[0]);
           var nodeArray =  Array.prototype.slice.call(resultContainer.childNodes);
            nodeArray.each(function(item, index){
                if( typeof jQuery(nodeArray[index]).attr('class') !== "undefined" && jQuery(nodeArray[index]).attr('class').indexOf('featured') >= 0)
                    featuredResultList.push(jQuery(item));
            });
        }
        return featuredResultList;
    }

    getFeaturedResultsCompanyNames(){
        var that = this;

        var companyNames = "";

        if(this.featuredResultList != null){
            this.featuredResultList.each(function(item0, index0){
                var resultContainer = jQuery(that.featuredResultList[index0]);
                var nodeArray = Array.prototype.slice.call(resultContainer[0].childNodes);
                nodeArray.each(function(item, index){
                    if( typeof jQuery(nodeArray[index]).attr('class') !== "undefined" && jQuery(nodeArray[index]).attr('class').indexOf('business-container') >= 0){
                        var secondNodeArray = Array.prototype.slice.call(item.childNodes);
                        secondNodeArray.each(function(item1, index1){
                            if( typeof jQuery(secondNodeArray[index1]).attr('class') !== "undefined" && jQuery(secondNodeArray[index1]).attr('class').indexOf('kozepcim2') >= 0){
                                companyNames += item1.innerText + ', ';
                            }
                        })
                    }
                })
            })
        }
        return companyNames;
    }
}