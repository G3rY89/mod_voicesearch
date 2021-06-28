CREATE TABLE IF NOT EXISTS `#__voicesearch` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`searchkeyword` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
    `zip` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`search` varchar(255) NOT NULL,
	`start` varchar(255) NOT NULL,
	`stop` varchar(255) NOT NULL,
	`greeting` varchar(255) NOT NULL,
	`goodbye` varchar(255) NOT NULL,
	`error` varchar(255) NOT NULL,
	`sorry` varchar(255) NOT NULL,
	`no_result` varchar(255) NOT NULL,
	`scroll_down` varchar(255) NOT NULL,
	`scroll_up` varchar(255) NOT NULL,
	`result` varchar(255) NOT NULL,
	`featured_results` varchar(255) NOT NULL,
	`tts_voice` varchar(255) NOT NULL,
	`lang` varchar(255) NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

INSERT INTO `#__voicesearch` (`searchkeyword`, `category`, `zip`, `city`, `search`, `start`, `stop`, `greeting`, `goodbye`, `error`, `sorry`, `no_result`, `scroll_down`, `scroll_up`, `result`, `featured_results`, `tts_voice`, `lang`) VALUES ('kulcsszó', 'kategória', 'irányítószám', 'település', 'keresés', 'szia', 'viszlát', 'Szia, miben segíthetek?', 'Viszlát!', 'Sajnálom, nem értettem azt, hogy: ', 'Sajnálom, a ', ' keresőben nincsen találat arra, hogy: ', 'görgess le', 'görgess fel', 'találat', 'Legnépszerűbb találatok: ', 'Mate', 'hu');
INSERT INTO `#__voicesearch` (`searchkeyword`, `category`, `zip`, `city`, `search`, `start`, `stop`, `greeting`, `goodbye`, `error`, `sorry`, `no_result`, `scroll_down`, `scroll_up`, `result`, `featured_results`,`tts_voice`, `lang`) VALUES ('expression', 'category', 'zip code', 'city', 'search', 'hello', 'bye', 'Hi, how can I help you?', 'Goodbye!', 'Sorry, I do not understand: ', 'Sorry, the ', ' searchfield does not have result for: ', 'scroll down', 'scroll up', 'result', 'Featured results: ', 'Mary', 'en');