var currentURL = window.location.href;
var processedURl=varss.split("/");
var i=0;

while(1)
{ 
   if(processedURl[i]=="index_ar.html#")
   {  
	document.location.href = "http://portal.gov.lb/dg/browse/contact-us/contactUS_ar.html? var=" + currentURL;
	break;
   }
    else{ 
	document.location.href = "http://portal.gov.lb/dg/browse/contact-us/contactUS.html? var=" + currentURL;
	break;
    }
	i=i+1;
}
