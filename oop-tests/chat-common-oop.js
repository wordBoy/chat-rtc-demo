/**
 * Accessibility Test Matrix - Common JS Script
 */

var Axtm = function() {

	//True means messages are posted to the log. Otherwise they are entirely suppressed.
	this.allowConsoleLogging = true;

	/**
	 * Manages logging for the web app
	 * @param msg String The message to log
	 * @returns void
	 */
	this.log = function(msg) {
	    if (!this.allowConsoleLogging) return;
	    if (typeof console == "undefined") return;
	    if (console) console.log(msg);
	};
	
};

