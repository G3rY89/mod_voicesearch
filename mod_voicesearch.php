<?php
/**
 * Voice search Module Entry Point
 */

// No direct access
defined('_JEXEC') or die;
// Include the syndicate functions only once
require_once dirname(__FILE__) . '/helper.php';

$document = &JFactory::getDocument();
$document->addScript('modules/mod_voicesearch/assets/js/Voicesearch.js');
$document->addScript('modules/mod_voicesearch/assets/js/JoomlaHelper.js');
$document->addScript('modules/mod_voicesearch/assets/js/PlaybackHandler.js');
$document->addScript('modules/mod_voicesearch/assets/js/TooltipHandler.js');
$document->addScript('modules/mod_voicesearch/assets/js/FlashingHandler.js');
$document->addScript('modules/mod_voicesearch/assets/js/ResultHandler.js');

JHtml::_('stylesheet', 'modules/mod_voicesearch/assets/style.css');

$voicesearch = ModVoiceSearchHelper::getVoiceSearch($params);
require JModuleHelper::getLayoutPath('mod_voicesearch');
?>

<script type="text/javascript">

    var voiceSearch = new Voicesearch();
    voiceSearch.start();
    
</script>