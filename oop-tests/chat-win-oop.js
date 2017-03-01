    
/**
* PLEASE NOTE!
* ------------
* Since this code is integrated a fair amount with the Incredible Accessible Modal Window
* code. Note that I use "IAMW" to reference that code set. Also, please see the git hub 
* codebase to know and understand the latest version: http://gdkraus.github.io/accessible-modal-dialog/    	*
*/

var ChatWin = function(configObj) {
	
	Iamwin.call(this, configObj);
	
	ChatWin.prototype = Object.create(Iamwin.prototype);
	
	//pass our configuration object
	this.winConfig = configObj;
	

    //When true, the agent chooser modal is not visible
    this.modalIsHidden = true;
		
	/**
	* When true, means that the header content in the window has
	* already been presented to the user. If they had a screen reader running,
	* it would have read the full header, and then be removed.
	*/
	this.acHeaderAlreadyRead = false;
	
	ChatWin.prototype.constructor = ChatWin;
};

/**
* Displays the chat launch button. Only needed after it is hidden.
*/
ChatWin.prototype.chatLaunchButton_show = function() {
	jQuery("#chat-launch-wrapper").css("aria-hidden",false);
	jQuery("#chat-launch-wrapper").removeClass("is-hidden");
};

/**
* Hides the chat launch button.
*/
ChatWin.prototype.chatLaunchButton_hide = function() {
	jQuery("#chat-launch-wrapper").css("aria-hidden",true);
	jQuery("#chat-launch-wrapper").addClass("is-hidden");
};


/**
* Hides the modal that is open by associating the appropriate CSS, then
* calling the IAMW code to complete the hiding.
*/
ChatWin.prototype.modalWindow_hide = function() {
	
	//set this false so that the header is read
	//the next time the agent chooser is opened.
	this.acHeaderAlreadyRead = false;
	
	//update visibility styles
	this.winConfig.rootPanelObjJQ.addClass("is-hidden");
	this.winConfig.rootPanelObjJQ.attr("aria-hidden",true);
	
	//set modal status
	this.modalIsHidden = true;
	
	//once we're done, show the chat launch button
	this.chatLaunchButton_show();
	
	//call the IAMW function to bring it home.
	this.hideModal();
	
	//execute any included functions
	for (var i in this.winConfig.modalCloseFunctions) {
		this.winConfig.modalCloseFunctions[i]();
	}
};

/**
* Displays the appropriate modal window. This function is very integrated into the
* demo, so it displays the agent chooser specifically, then hands off to the IAMW
* to carry it home and display the modal window.
*/
ChatWin.prototype.modalWindow_show = function() {
	
	var focusOnFirst = false;
	
	//update our window status
	this.modalIsHidden = false;
	
	//hide chat launch button
	this.chatLaunchButton_hide();
	
	//if jQuery can't find the modal window, we exit.
	//This typically occurs during development.
	if (this.winConfig.rootPanelObjJQ.length == 0) {
		//Houston, we have a problem.
		return;
	}
	
	//strip off classes for hiding our modal window
	this.winConfig.rootPanelObjJQ.removeClass("is-hidden");
	this.winConfig.rootPanelObjJQ.attr("aria-hidden",false);
	
	//hand off to the incredible modal window code to do it's incredible thing.
	this.showModal(this.winConfig.rootPanelObjJQ, focusOnFirst);
	
	//If the header content has not yet been read, bind it to the first item
	//in the agent chooser.
	if (!this.acHeaderAlreadyRead) {
		this.winConfig.firstFocusItemJQ.attr("aria-describedby",this.winConfig.headerPtrStr);
		this.winConfig.firstFocusItemJQ.blur(this.modalHeader_wasRead);
	}
	
	//focus on the intended item here, which is the initial button.
	this.focusOnItem(this.winConfig.firstFocusItemJQ);    		
};

/**
* Event handler attached to the first list item in the agent chooser
* list of site options. Once the 'blur' event occurs, meaning that first
* item loses focus, this event is called where we remove the binding
* so that the header content is not repeated unless the user closes the 
* modal and re-opens it.
*/
ChatWin.prototype.modalHeader_wasRead = function(evt) {
	this.acHeaderAlreadyRead = true;
	this.winConfig.firstFocusItemJQ.removeAttr("aria-describedby");
};