

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