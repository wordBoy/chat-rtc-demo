
var winConfig = {};

/**
* When true, means that the header content in the window has
* already been presented to the user. If they had a screen reader running,
* it would have read the full header, and then be removed.
*/
var acHeaderAlreadyRead = false;

/**
* Displays the chat launch button. Only needed after it is hidden.
*/
function chatLaunchButton_show() {
	jQuery("#chat-launch-wrapper").css("aria-hidden",false);
	jQuery("#chat-launch-wrapper").removeClass("is-hidden");
}

/**
* Hides the chat launch button.
*/
function chatLaunchButton_hide() {
	jQuery("#chat-launch-wrapper").css("aria-hidden",true);
	jQuery("#chat-launch-wrapper").addClass("is-hidden");
}

function modalWindow_initialize(configObj) {
	
	winConfig = configObj;

	//listen for the tab key
	winConfig.rootPanelObjJQ.on("keydown",{closeBtn:winConfig.closeButtonIdStr},function(event) {
        trapTabKey($(this), event);
    });
	
	//listen for the escape key
	winConfig.rootPanelObjJQ.on("keydown",{closeBtn:winConfig.closeButtonIdStr},function(event) {
        trapEscapeKey($(this), event);
    });
}

/**
* Hides the modal that is open by associating the appropriate CSS, then
* calling the IAMW code to complete the hiding.
*/
function modalWindow_hide() {
	
	//set this false so that the header is read
	//the next time the agent chooser is opened.
	acHeaderAlreadyRead = false;
	
	//update visibility styles
	winConfig.rootPanelObjJQ.addClass("is-hidden");
	winConfig.rootPanelObjJQ.attr("aria-hidden",true);
	
	//set modal status
	modalIsHidden = true;
	
	//once we're done, show the chat launch button
	chatLaunchButton_show();
	
	//call the IAMW function to bring it home.
	hideModal();
	
	//execute any included functions
	for (var i in winConfig.modalCloseFunctions) {
		winConfig.modalCloseFunctions[i]();
	}
}

/**
* Displays the appropriate modal window. This function is very integrated into the
* demo, so it displays the agent chooser specifically, then hands off to the IAMW
* to carry it home and display the modal window.
*/
function modalWindow_show() {
	
	var focusOnFirst = false;
	
	//update our window status
	modalIsHidden = false;
	
	//hide chat launch button
	chatLaunchButton_hide();
	
	//if jQuery can't find the modal window, we exit.
	//This typically occurs during development.
	if (winConfig.rootPanelObjJQ.length == 0) {
		//Houston, we have a problem.
		return;
	}
	
	//strip off classes for hiding our modal window
	winConfig.rootPanelObjJQ.removeClass("is-hidden");
	winConfig.rootPanelObjJQ.attr("aria-hidden",false);
	
	//hand off to the incredible modal window code to do it's incredible thing.
	showModal(winConfig.rootPanelObjJQ, focusOnFirst);
	
	//If the header content has not yet been read, bind it to the first item
	//in the agent chooser.
	if (!acHeaderAlreadyRead) {
		winConfig.firstFocusItemJQ.attr("aria-describedby",winConfig.headerPtrStr);
		winConfig.firstFocusItemJQ.blur(modalHeader_wasRead);
	}
	
	//focus on the intended item here, which is the initial button.
	focusOnItem(winConfig.firstFocusItemJQ);    		
}

/**
* Event handler attached to the first list item in the agent chooser
* list of site options. Once the 'blur' event occurs, meaning that first
* item loses focus, this event is called where we remove the binding
* so that the header content is not repeated unless the user closes the 
* modal and re-opens it.
*/
function modalHeader_wasRead(evt) {
	acHeaderAlreadyRead = true;
	winConfig.firstFocusItemJQ.removeAttr("aria-describedby");
}