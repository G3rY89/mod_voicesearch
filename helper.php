<?php
require_once dirname(__FILE__) . '/tts.php';

class ModVoiceSearchHelper
{    
    public static function getVoiceSearch($params)
    {
        JHtml::_('jquery.framework', false);
        return '<div class="tooltip1"><span class="tooltiptext1"></span><input class="allie-logo" type="image" onclick="voiceSearch.start()" src="modules/mod_voicesearch/media/images/allie.png" border="0" id="voicesearch" name="voicesearch"/></div>';
    }

    public static function getDBDataAjax(){
        $lang = $_POST["lang"];

        $db = JFactory::getDbo();

        $query = $db->getQuery(true)
                    ->select($db->quoteName(array('searchkeyword', 'category', 'zip', 'city', 'search', 'start', 'stop', 'greeting', 'goodbye', 'error', 'sorry', 'no_result', 'scroll_down', 'scroll_up', 'featured_results', 'tts_voice', 'lang')))
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
            'key' => 'e94ea3d0dabd4a8c9b3b98fa1599b6dc',
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
}