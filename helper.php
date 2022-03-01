<?php
require_once dirname(__FILE__) . '/tts.php';

class ModVoiceSearchHelper
{    
    public static function getVoiceSearch($params)
    {
        JHtml::_('jquery.framework', false);
        return '<div class="tooltip1"><span class="tooltiptext1">Hangvezérlés aktiválásához kattints ide!</span><input class="allie-logo" type="image" onclick="voiceSearch.start()" src="modules/mod_voicesearch/media/images/allie.png" border="0" id="voicesearch" name="voicesearch"/></div>';
    }

    public static function getDBDataAjax(){
        $lang = $_POST["lang"];

        $db = JFactory::getDbo();

        $query = $db->getQuery(true)
                    ->select($db->quoteName(array('searchkeyword', 'category', 'zip', 'city', 'search', 'start', 'stop', 'greeting', 'goodbye', 'error', 'sorry', 'no_result', 'scroll_down', 'scroll_up', 'result', 'featured_results', 'new_search', 'tts_voice', 'lang')))
                    ->from($db->quoteName('#__voicesearch'))
                    ->where($db->quoteName('lang') .' LIKE ' . $db->quote('%' . $lang . '%'));
                    
        $db->setQuery($query);

        $result = $db->loadObjectList();
        
        return $result;
    }

    public static function getVoiceFromAPIAjax(){
        $TTS = $_POST["TTS"];
        $langobject = $_POST["Langobject"];

        $tts = new VoiceRSS;
        $voice = $tts->speech([
            'key' => '4fe3db9cda364051999f3903a58f3afc',
            'hl' =>$langobject["lang"] == "hu" ? 'hu-hu' : 'en-us',
            'v' => $langobject["tts_voice"],
            'src' => $TTS,
            'r' => '0',
            'c' => 'wav',
            'f' => '44khz_16bit_stereo',
            'ssml' => 'false',
            'b64' => 'true'
        ]);

        return $voice['response'];
    }

    public static function getCompanyDataAjax(){
        $companyName = $_POST["companyName"];
        
        $db = JFactory::getDbo();

        $query = $db->getQuery(true)
                    ->select($db->quoteName(array('name', 'website', 'phone', 'email')))
                    ->from($db->quoteName('#__jbusinessdirectory_companies'))
                    ->where($db->quoteName('name') .' LIKE ' . $db->quote('%' . $companyName . '%'));
        $db->setQuery($query);

        $result = $db->loadObjectList();
        
        return $result;
    }
}