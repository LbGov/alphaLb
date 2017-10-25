function copyURL(){

	var currentURL = window.location.href;
	var processedURl=varss.split("/");
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
