class ResultReader{
    constructor(){

    }

    getFeaturedResults(){
        $featuredResults = new Array();

        $results = jQuery("#results-container");
        if($results != null){
            $results.each(function(i){
                if(~jQuery($results[i]).attr('class').indexOf('featured')){
                    $featuredResults.add(jQuery($results[i]));
                }
            });
        }
        return $featuredResults;
    }

    getFeaturedResultsCompanyName($featuredResults){
        $companyNames = [];
        if($featuredResults != null){
            $featuredResults.each(function(i){
                $companyNames.push(jQuery('span[itemprop="name"]').text);
            })
        }
        return $companyNames;
    }
}