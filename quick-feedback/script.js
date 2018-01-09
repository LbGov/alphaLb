var div = document.getElementById("wrong");
var data = '  <div class="row" style="position:relative;left:20px;"><div class="dgDiv"><div class="PrintPageFeature page-feature"><div class="print-container">  <h2 class="sr-only">  Print</h2>';
data=data+'<button type="button" class="btn-link" id="print-page-button"><i class="fa fa-print" aria-hidden="true"></i><span>Print</span>';
data=data+'</button><noscript><div class="callout-alert">Sorry, this button doesn’t work without Javascript. Try pressing Control + P on your keyboard to print, or use your browser’s print option.</div></noscript>';

data=data+'</div></div>  <a href="javascript:void(0)" onclick="showProblemForm()" style="color:darkslateblue"><b>Is There Something Wrong With This Page?</b></a><div>';

data=data+'<form name="problemForm" action="scripts/problemForm.php" method="POST" onsubmit="return validateProblemForm();"><div id="problemFormFields" style="display:none;">&nbsp;<h2>Help us improve Gov.lb</h2>';

data = data + '<label for="Form_FeedbackForm_Doing">What were you doing</label><br><input type="text" name="doingAction" class="dg-input-form" id="Form_FeedbackForm_Doing" required="required" style="width: 30em;" /><br><label for="Form_FeedbackForm_Wrong">What went wrong</label><br><input type="text" name="wrongAction" style="width: 30em;" class="dg-input-form" id="Form_FeedbackForm_Wrong" required="required" /><br>';
data = data + '<input type="hidden" name="Referer" value="http://Gov.lb/dg/index.html" class="hidden" id="Form_FeedbackForm_Referer" />&nbsp;<div><input type="submit"  style="  width: 10em;  " name="action_doProcessProblem" value="Submit" />';
    
data=data+'</div></div></form></div></div></div><br />';  
            
div.innerHTML = data;



  
