function copyURL(){

	var currentURL = window.location.href;
	var processedURl = currentURL.split("/");
	var i=0;

	while(1)
	{ 
	   if(processedURl[i]=="index_ar.html#")
	   {  
	       document.location.href = "http://portal.gov.lb/dg/about/feedback/feedback_ar.html? var=" + currentURL;
		break;
	   }
		else{ 
		document.location.href = "http://portal.gov.lb/dg/about/feedback/feedback.html? var=" + currentURL;
		break;
		}
		i=i+1;
	}
} 

    function setLanguage(lang) {
        var langOutput = lang.localeCompare('en');
        if (langOutput == 0) {
            window.location.href = "http://portal.gov.lb/dg/index.html";
        }
        else {
            window.location.href = "http://portal.gov.lb/dg/index_ar.html";
        }
    }

    function showProblemForm() {
        var problemForm = document.getElementById("problemFormFields");
        if (problemForm.style.display == "none") {
            problemForm.style.display = "block";
        }
        else {
            problemForm.style.display = "none";
        }
        return true;
    }

    function validateProblemForm() {
        if ((document.problemForm.doingAction.value == "") || (document.problemForm.wrongAction.value == "")) {
            alert("The Form fields cannot be empty");
            return false;
        }
        else {
            document.problemForm.Referer.value=document.URL;            
            return true;
        }        
    }

    function specificURLSection() {   //this function paste the url in the contact page
        var varss = window.location.href;
        var page = varss.split("=");
        // alert(page[1].toString());
        document.getElementById("specificURLSection").style.display = "block";
        document.getElementById("specificIDSection").style.display = "none";
        document.feedbackform.SpecificPage.value = page[1].toString();
        return true;
    }

    function specificIdSection() {
        document.getElementById("specificURLSection").style.display = "none";
        document.getElementById("specificIDSection").style.display = "block";
    }

    function hideAll() {
        document.getElementById("specificURLSection").style.display = "none";
        document.getElementById("specificIDSection").style.display = "none";
    }

    function validateFeedbackForm() {
        if (document.feedbackform.DetailMessage.value == "") {
            alert("The Message field cannot be empty");
            return false;
        }
        return true;
    }

    function sectionSwitch(firstSection, secondSection, thirdSection, radioId) {

        var answerOutput = document.getElementById(radioId);
        if (answerOutput.checked) {
            document.getElementById(firstSection).style.display = "none";
            document.getElementById(secondSection).style.display = "block";
        }
        else {
            document.getElementById(firstSection).style.display = "none";
            document.getElementById(thirdSection).style.display = "block";

        }
        
    }

    function displaySection(sectionId) {
        document.getElementById(sectionId).style.display = "block";     
    }

    function hideSection(sectionId) {
        document.getElementById(sectionId).style.display = "none";

    }

    function uncheckRadioButton(radioId, buttonId, buttonState) {
        var radioButton = document.getElementById(radioId);
        radioButton.checked = false;
        if (buttonState) {
            document.getElementById(buttonId).disabled = true;
        }
        else {
            document.getElementById(buttonId).disabled = false;
        }
    }