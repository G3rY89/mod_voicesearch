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

    var voiceSearch = new Voicesearch();
    voiceSearch.start();

    /* function getFeaturedResults(){
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

    function getFeaturedResultsCompanyName($featuredResults){
        $companyNames = [];
        if($featuredResults != null){
            $featuredResults.each(function(i){
                $companyNames.push(jQuery('span[itemprop="name"]').text);
            })
        }
        return $companyNames;
    } */
    
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