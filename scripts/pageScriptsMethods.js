﻿

function copyURL() {

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

    function uncheckSection(radioId1, radioId2, radioId3, radioId4, radioId5) {
      
        var radioButton = document.getElementById(radioId1);
        radioButton.checked = false;
        var radioButton = document.getElementById(radioId2);
        radioButton.checked = false;
        var radioButton = document.getElementById(radioId3);
        radioButton.checked = false;
        var radioButton = document.getElementById(radioId4);
        radioButton.checked = false;
        var radioButton = document.getElementById(radioId5);
        radioButton.checked = false;
      
    }


    function openWorkerChosenTransaction3()
    {
    if (document.getElementById('work-permit1').checked == true) {
        location.href = "work-permit/index_ar.html";
    }
    if (document.getElementById('work-residence').checked == true) {
        location.href = "work-residence/index_ar.html";
    }
}
    function openWorkerChosenTransaction2()
    {
        var currentURL;
        var processedURl;
        if (document.getElementById('adjust_worker').checked == true) {
            currentURL = window.location.href;
            processedURl = currentURL.split("=");
            location.href = "worker_adjust_status/index_" + processedURl[1] + ".html";
        }
        if (document.getElementById('renew_worker').checked == true) {
            currentURL = window.location.href;
            processedURl = currentURL.split("=");
            location.href = "renew-worker/category_4/index_" + processedURl[1] + ".html";
        }
        if (document.getElementById('options-conditions').checked == true) {
            location.href = "options-conditions/index_ar.html";
        }

        if (document.getElementById('prior-approval').checked == true) {
            location.href = "prior-approval/index_ar.html";
        }
        if (document.getElementById('work-permit').checked == true) {
            location.href = "work-permit/index_ar.html";
        }
        if (document.getElementById('transfer-sponsorship').checked == true) {
            location.href = "transfer-sponsorship/index_ar.html";
        }
      

    }

    function openWorkerChosenTransaction() {
        var currentURL;
        var processedURl;
        if (document.getElementById('adjust_worker').checked == true)
        {
            currentURL = window.location.href;
             processedURl = currentURL.split("=");
            location.href = "worker_adjust_status/index_" + processedURl[1] + ".html";
        }
        if (document.getElementById('new_worker').checked == true) {
            currentURL = window.location.href;
            processedURl = currentURL.split("=");
            location.href = "new-worker/index_" + processedURl[1] + ".html";
        }
        if (document.getElementById('renew_worker').checked == true) {
            currentURL = window.location.href;
            processedURl = currentURL.split("=");
            location.href = "renew-worker/index_" + processedURl[1] + ".html";
        }

  
     
        
    }

    function openWorkerTransactionPage(NextPageID) {

        var section;

        if (document.getElementById('one').checked == true) {
            section = "1";
            window.location.href = NextPageID + "?section=" + section;
        }

        else if (document.getElementById('two').checked == true) {
            section = '2';
            window.location.href = NextPageID + "?section=" + section;
        }
        else if (document.getElementById('three').checked == true) {
            section = '3';
            window.location.href = NextPageID + "?section=" + section;
        }
        else if (document.getElementById('four').checked == true) {
            section = '4';
            NextPageID = "type_worker_domestic.html";
            window.location.href = NextPageID + "?section=" + section;;

        }
        else
            alert("الرجاء إدخال فئة");
   
      
    }


    function openNewPageOnRadioButtonClick(firstPageID, secondPageID, noRadioId) {
        if (noRadioId == null) {
            location.href = firstPageID;
            }
        else {
            var radioButton = document.getElementById(noRadioId);
            if (radioButton.checked == true) {
                location.href = secondPageID;
            }
            else {
                location.href = firstPageID;
            }
        }
    }
   
    function openNewPage(pageID) {
        location.href = pageID;
        }

    function openNewPageWithValidation(pageID, validatedField) {
        var validatedField = document.getElementById(validatedField);

                if (validatedField.value) {
                    openNewPage(pageID);
                }

                else {
                    alert("This page fields cannot be empty");
                }
            }

    function attachFiles() {
        var attachId = document.createElement("INPUT");
        attachId.setAttribute("type", "file");
        document.body.appendChild(x);
    }
   
