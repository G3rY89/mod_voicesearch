/**
 * Class that handles the results on the company result page
 */
class ResultHandler{

    featuredResultList;
    resultContainer;

    constructor(){
        this.resultContainer = jQuery("#results-container")[0];
        this.featuredResultList = this.getFeaturedResults();
    }

    /**
     * Iterates through the company result list
     * @returns the first 3 results
     */
    getFeaturedResults(){
        var that = this;
        var featuredResultList = [];

        if(this.resultContainer != null){
           var nodeArray =  Array.prototype.slice.call(that.resultContainer.childNodes);
            nodeArray.each(function(item, index){
                if( typeof jQuery(nodeArray[index]).attr('class') !== "undefined" && jQuery(nodeArray[index]).attr('class').indexOf('featured') >= 0){
                    featuredResultList.push(jQuery(item));
                } else if(index <= 3) {
                    featuredResultList.push(jQuery(item));
                }
            });
        }
        return featuredResultList;
    }

    /**
     * Iterates through the featured result lists companies
     * @returns the name of the comapnies
     */
    getFeaturedResultsCompanyNames(){
        var that = this;

        var companyNames = "";

        if(this.featuredResultList != null){
            this.featuredResultList.each(function(item0, index0){
                var resultContainer = jQuery(that.featuredResultList[index0]);
                var nodeArray = Array.prototype.slice.call(resultContainer[0].childNodes);
                nodeArray.each(function(item, index){
                    if( typeof jQuery(nodeArray[index]).attr('class') !== "undefined" && jQuery(nodeArray[index]).attr('class').indexOf('business-container') >= 0){
                        companyNames += item.firstElementChild.innerText + ', ';
                    }
                })
            })
        }
        return companyNames;
    }

    /**
     * Iterates through the company result container
     * @param {*} nthResult 
     * @returns the nth result of the company list
     */
    getNthResult(nthResult){
        var that = this;

        var companyName = "";

        if(this.resultContainer != null){
            var nodeArray =  Array.prototype.slice.call(that.resultContainer.childNodes);
            var filteredNodeArray = nodeArray.filter(function(el) {return el.nodeName != "#text"});
            try{
                var resultContainer = jQuery(filteredNodeArray[nthResult-1]);
                var nodeArray = Array.prototype.slice.call(resultContainer[0].childNodes);
                nodeArray.each(function(item, index){
                    if( typeof jQuery(nodeArray[index]).attr('class') !== "undefined" && jQuery(nodeArray[index]).attr('class').indexOf('business-container') >= 0){
                        companyName = item.firstElementChild.innerText + ', ';
                    }
                })
                return new Promise(function(resolve, reject){
                    var request = jQuery.ajax({
                        url: 'index.php?option=com_ajax&module=voicesearch&method=getCompanyData&format=json',
                        type: "post",
                        data:{companyName:companyName.replace(/,\s*$/, "").substring(companyName.indexOf(" ") + 1)}
                    });
                    request.success(function(response){
                        var result =  "Cégnév. " + response.data[0].name + ", Weboldal. " + response.data[0].website + ", Telefonszám. " + response.data[0].phone + ", Email cím. " + response.data[0].email;
                        resolve(result);
                    })
                })   
            } catch(err){
                return new Promise(function(resolve, reject){
                    resolve("Nincs ilyen találat");
                }); 
            }
        }
    }
}