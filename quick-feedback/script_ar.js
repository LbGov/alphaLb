

var div = document.getElementById("wrong");
var data = '  <div class="row" dir="rtl"  style="position:relative;right:20px;"><div class="dgDiv"><div class="PrintPageFeature page-feature"><div class="print-container">  <h2 class="sr-only">  طباعة</h2>';
data = data + '<button type="button" class="btn-link" id="print-page-button"><i class="fa fa-print" aria-hidden="true"></i>&nbsp<span>طباعة</span>';
data = data + '</button><noscript><div class="callout-alert">Sorry, this button doesn’t work without Javascript. Try pressing Control + P on your keyboard to print, or use your browser’s print option.</div></noscript>';

data = data + '</div></div>  <a href="javascript:void(0)" onclick="showProblemForm()" style="color:darkslateblue"><b>هل هنالك مشكلة على الصفحة؟</b></a><div>';

data = data + '<form name="problemForm" action="scripts/problemForm.php" method="POST" onsubmit="return validateProblemForm();"><div id="problemFormFields" style="display:none;">&nbsp;<h2>ساعدنا على تحسين GOV.LB</h2>';

data = data + '<label for="Form_FeedbackForm_Doing">ماذا كنت تفعل</label><br><input type="text" name="doingAction" class="dg-input-form" id="Form_FeedbackForm_Doing" required="required" style="width: 30em;"  /><br><label for="Form_FeedbackForm_Wrong">ماذا حصل</label><br><input type="text" style="  width: 30em;  "  name="wrongAction" class="dg-input-form" id="Form_FeedbackForm_Wrong" required="required" /><br>';
data = data + '<input type="hidden" name="Referer" value="http://Gov.lb/dg/index.html" class="hidden" id="Form_FeedbackForm_Referer" />&nbsp;<div><input type="submit" name="action_doProcessProblem" style="  width: 10em;  "  value="إرسال" />';
div.innerHTML = data;
data = data + '</div></div></form></div></div></div><br />';

