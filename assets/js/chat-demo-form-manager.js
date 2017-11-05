
/**
* Contains the for elements to manage.
* expects to be passed an array of objects where each objects 
* has the follow properties:
* 	rootId - the id of the control to manage
* 	noErrors - the status of errors on this input
* 	errStatement - the error statement to show.
* 	Here's an example object: {"rootId":"pcs-first-btn","noErrors":true,"errStatement":"Please insert a first name"}
*/ 
var formElements = [];
	    
function formMgr_initialize(configObj) {
	
	formElements = configObj;
}

/**
* Handle form validation here.
*/
function validatePCS() {
	
	var hasErrors = false;
	clearErrStatements();
	
	for (var i in formElements) {
		if (!formHasValidContent(formElements[i])) {
			hasErrors = true;
			buildErrStatement(formElements[i]);
		}
	}
	
	if (hasErrors) focusOnFirstError();
}

/**
 * Focus on the first item in error, if any
 * 
 * @returns void
 */
function focusOnFirstError() {
	var len = formElements.length;
	
	for (var i=0;i<len;i++) {
		if (!formElements[i].noErrors) {
			focusOnItem(jQuery("#"+formElements[i].rootId));
			break;
		}
	}
}

function formHasValidContent(item) {
	var result = true;
	
	var formItemJq = jQuery("#" + item.rootId);
	if (formItemJq.length == 0) {
		ATM.log("Code problem! Can't find the label id '" + item.rootId + "'");
		return false;
	}
	
	if (formItemJq.val() == "" || formItemJq.val().length < 2) {
		result = false;
	}
	
	if (!result) item.noErrors = false;	    	
	return result;
		
}

function buildErrStatement(item) {
	var err = "<div id='"
	var err2 = "' style='color:red;'>"
	var err3 = "</div>";
	var temp;
    	
	var result = false;
	var labelJq = jQuery("#label-" + item.rootId);
	
	temp = err + "err-" + item.rootId + err2 + item.errStatement + err3; 
	labelJq.after(temp);
	
	//console.log("buildErrStatement(): rootId = " + item.rootId);
	jQuery("#" + item.rootId).attr("aria-describedby","err-" + item.rootId);
	jQuery("#" + item.rootId).attr("aria-invalid",true);
}

function clearErrStatements() {
	
	for (var i in formElements) {
		formElements[i].noErrors = true;
    	jQuery("#err-"+formElements[i].rootId).remove();
    	jQuery("#" + formElements[i].rootId).removeAttr("aria-describedby");
    	jQuery("#" + formElements[i].rootId).removeAttr("aria-invalid");	
	}
}

