<?php
	
	$pageLoc = $_SERVER['PHP_SELF'];
	$currLoc = "";
	
	$logOutMenuOption = "<li><a href=\"log-out.php\">Log Out</a></li>";
	
	if (strrpos($pageLoc, "index.php")) {
		$currLoc = "home";
	} else if (strrpos($pageLoc, "contact-us.php")) {
		$currLoc = "contact";
	} else if (strrpos($pageLoc, "about-us.php")) {
		$currLoc = "about";
	} else if (strrpos($pageLoc, "resources.php")) {
		$currLoc = "rsrc";
	}
	
	$navCode = "<nav role=\"navigation\" class=\"navbar navbar-inverse navbar-fixed-top\">
      <div class=\"container\">
        <div class=\"navbar-header\">
          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\" aria-label=\"Toggle navigation\">
            <!--<span class=\"sr-only\">Toggle navigation</span>-->
            <span class=\"icon-bar\"></span>
            <span class=\"icon-bar\"></span>
            <span class=\"icon-bar\"></span>
          </button>
          <a class=\"navbar-brand\" href=\"index.php\" aria-label=\"Accessibility Test Matrix\">ATM</a>
        </div>
        <div id=\"navbar\" class=\"collapse navbar-collapse\">
          <ul class=\"nav navbar-nav\">";
	
	if ($currLoc == "contact")  {
		$navCode = $navCode . "<li><a href=\"index.php\">Home</a></li>
            <li><a href=\"about-us.php\">About</a></li>
            <li class=\"active\"><a href=\"contact-us.php\">Contact</a></li>
            <li><a href=\"resources.php\">Resources</a></li>
            <li><a href=\"log-out.php\">Log Out</a></li>";
	} else if ($currLoc == "about")  {
		$navCode = $navCode . "<li><a href=\"index.php\">Home</a></li>
            <li class=\"active\"><a href=\"about-us.php\">About</a></li>
            <li><a href=\"contact-us.php\">Contact</a></li>
            <li><a href=\"resources.php\">Resources</a></li>";
	} else if ($currLoc == "rsrc")  {
		$navCode = $navCode . "<li><a href=\"index.php\">Home</a></li>
            <li><a href=\"about-us.php\">About</a></li>
            <li><a href=\"contact-us.php\">Contact</a></li>
            <li class=\"active\"><a href=\"resources.php\">Resources</a></li>";
	} else {
		//default to home screen if we're not sure where we are.
		$navCode = $navCode . "<li class=\"active\"><a href=\"index.php\">Home</a></li>
            <li><a href=\"about-us.php\">About</a></li>
            <li><a href=\"contact-us.php\">Contact</a></li>
            <li><a href=\"resources.php\">Resources</a></li>";
	}
	
	if (is_session_started() === TRUE) {
		$navCode = $navCode . $logOutMenuOption;
	}
		
	$navCode = $navCode . "</ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>";
	
	echo $navCode;
	

	/*
	 * BASE NAV CODE
	 "<nav class=\"navbar navbar-inverse navbar-fixed-top\">
	 <div class=\"container\">
	 <div class=\"navbar-header\">
	 <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">
	 <span class=\"sr-only\">Toggle navigation</span>
	 <span class=\"icon-bar\"></span>
	 <span class=\"icon-bar\"></span>
	 <span class=\"icon-bar\"></span>
	 </button>
	 <a class=\"navbar-brand\" href=\"index.php\">A11y Test Matrix</a>
	 </div>
	 <div id=\"navbar\" class=\"collapse navbar-collapse\">
	 <ul class=\"nav navbar-nav\">
	 <li class=\"active\"><a href=\"index.php\">Home</a></li>
	 <li><a href=\"#about\">About</a></li>
	 <li><a href=\"#contact\">Contact</a></li>
	 </ul>
	 </div><!--/.nav-collapse -->
	 </div>
	 </nav>";
	 */
?>