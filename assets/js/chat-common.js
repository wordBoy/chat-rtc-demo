/**
 * Accessibility Test Matrix - Common JS Script
 */

//declare global namespace
var ATM = {};

//declare the base function in the window object
window.ATM = ATM;

//True means messages are posted to the log. Otherwise they are entirely suppressed.
ATM.allowConsoleLogging = true;

/**
 * Manages logging for the web app
 * @param msg String The message to log
 * @returns void
 */
ATM.log = function (msg) {
    "use strict";

    if (ATM.allowConsoleLogging && !(console === undefined)) {
        console.log(msg);
    }
};

/**
 * Manages any page ready functions specific to the ATM app.
 * If there is no loadPageConfig already loaded, nothing happens.
 * @return void
 */
ATM.pageReady = function () {
    "use strict";

    if (typeof loadPageConfig === "function") {
        loadPageConfig();
    }
};

//the pageReady function has to be defined before this can be called
jQuery(document).ready(ATM.pageReady);

/**
 * Retrieves the current query string request and returns it's value.
 * A null value is returned if the query string item is not found.
 * @param qString String The query string item for which a value is requested
 * @returns String
 */
ATM.getQueryString = function (qString) {
    "use strict";

    var returnValue;
    var qStringLoc;
    var temp;

    if (!qString) {
        return returnValue;
    }

    qStringLoc = window.location.search.indexOf(qString);
    if (qStringLoc === -1) {
        return returnValue;
    }

    //get rid of everything before our qString
    returnValue = window.location.search;
    returnValue = returnValue.substring(qStringLoc);

    //get rid of everything after our qString
    temp = returnValue.split("&");
    returnValue = temp[0];

    //now just grab the value
    temp = returnValue.split("=");
    returnValue = temp[1];

    return returnValue;
};

/**
 * Stubbed out function for validation.
 */
ATM.validateStringTextFormInput = function () {
    "use strict";

    return true;
};