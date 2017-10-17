var varss = window.location.href;
var tab=varss.split("/");
var i=0;

while(1)
{ 
   if(tab[i]=="index_ar.html#")
   {  
	document.location.href = "http://portal.gov.lb/dg/browse/contact-us/contactUS_ar.html? var=" + varss;
	break;
   }
    if(tab[i]=="index.html#")
   {  
	document.location.href = "http://portal.gov.lb/dg/browse/contact-us/contactUS.html? var=" + varss;
	break;
    }
   
  
	i=i+1;
}
