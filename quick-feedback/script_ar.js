var div = document.getElementById("wrong");
var data = ' <div class="row" dir="rtl" align="right" style="position:relative;right:10px;> <div class="dgDiv_ar"><div class="PrintPageFeature page-feature"> <div class="print-container" dir="rtl">';

data = data + '<h2 class="sr-only">طباعة </h2><button type="button" class="btn-link" id="print-page-button">  <i class="fa fa-print" aria-hidden="true"></i>&nbsp;<span>طباعة</span>';
data=data+'</button><noscript><div class="callout-alert">Sorry, this button doesn’t work without Javascript. Try pressing Control + P on your keyboard to print, or use your browser’s print option.</div></noscript> </div>';
data=data+'</div> <a href="javascript:void(0)" onclick="showProblemForm() " style="color:darkslateblue"><b> هل هنالك مشكلة على الصفحة؟</b></a><div>';
data=data+' <form name="problemForm" action="scripts/problemForm.php" method="POST" onsubmit="return validate ()"><div id="problemFormFields" style="display:none;" dir="rtl"> &nbsp;';
data = data + '<h2> ساعدنا على تحسين GOV.LB</h2><label for="Form_FeedbackForm_Doing">ماذا كنت تفعل</label><br><input type="text" name="doingAction" class="dg_input_form_ar"  style="width:500px" id="Form_FeedbackForm_Doing" required="required" />';

data = data + '<br><label for="Form_FeedbackForm_Wrong">ماذا حصل</label><br><input type="text" name="wrongAction" class="dg_input_form_ar" id="Form_FeedbackForm_Wrong" required="required" style="width:500px" /><br>';

data=data+'<input type="hidden" name="Referer" value="http://Gov.lb/" class="hidden" id="Form_FeedbackForm_Referer" />&nbsp;<div>';
data=data+' <input type="submit" name="action_doProcessProblem" value="إرسال" /></div></div></form></div></div></div>';

   



div.innerHTML = data;