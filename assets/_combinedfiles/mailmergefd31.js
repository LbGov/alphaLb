/****** FILE: mailmerge/javascript/mailmerge.js *****/

(function($){function checkBoxes(oBox){var
sAction=$(oBox).data("action"),bChecked=$(oBox).is(":checked"),oParent=$(oBox).parent();switch(sAction){case'checkall':$(oParent).parent().find("input:checkbox").prop("checked",bChecked);break;case'checkchildren':$(oParent).find("input:checkbox").prop("checked",bChecked);siblingCheck($(oParent).closest("ul").find("li input:checkbox[data-action=checkall]"));break;default:var
sID=$(oParent).parent().attr('id');if(typeof sID!=="undefined"&&$(oParent).parent().attr('id').indexOf("list")===0)
siblingCheck($(oParent).closest("ul").find("li input:checkbox[data-action=checkall]"))
else
parentCheck($(oParent).parent().closest("li").find("input:checkbox"));}
checkMayors();}
function setMayorsEnabled(bEnabled){if(bEnabled){$("#includeMayors").removeClass('disabled');$("#includeMayors input").removeAttr('disabled');}else{$("#includeMayors").addClass('disabled');$("#includeMayors input").attr('disabled',true);}}
function checkMayors(){var
bEnabled=($('#sectors89').is(':checked')||$('#sectors92').is(':checked')||$('#sectors95').is(':checked')||$('#sectors98').is(':checked')||$('#sectors101').is(':checked'));setMayorsEnabled(bEnabled);}
function parentCheck(oParent){var
bChecked=true;$(oParent).parent().find("input:checkbox").each(function(){if($(this).attr("id")!==$(oParent).attr("id")){if(bChecked)
bChecked=$(this).is(":checked");}});$('#'+oParent.attr("id")).prop("checked",bChecked);if($(oParent).data("action")==="checkchildren")
siblingCheck($(oParent).parent().closest('ul').find("li input:checkbox[data-action=checkall]"));}
function siblingCheck(oFirst){var
bChecked=true;$(oFirst).closest('ul').children().children("input:checkbox").each(function(){if($(this).attr("id")!==$(oFirst).attr("id")){if(bChecked)
bChecked=$(this).is(":checked");}});$('#'+oFirst.attr("id")).prop("checked",bChecked);}
function validateCheckboxes(){var
bOut=($("#list-authorities input[type=checkbox]:checked").length||$("#list-services input[type=checkbox]:checked").length)>0;validateShow(bOut);return bOut;}
function validateShow(bOut){var
oCallout=$('#MailMergeForm_MailMergeForm').find(".messages-block.bad-msg.callout-alert").first(),sMsg='<h2 tabindex="-1">Select at least one of the <em>Local authorities</em>, <em>State services&nbsp;</em> or <em>State Sector organisations outside of State Services&nbsp;</em> before downloading.</h2>';if(bOut&&oCallout.length)
oCallout.hide()
else if(!bOut){if(oCallout.length){oCallout.html(sMsg);oCallout.show();}
else
oCallout=$('<div/>',{html:sMsg,"class":"messages-block bad-msg callout-alert"}).prependTo('#MailMergeForm_MailMergeForm');var offset=oCallout.offset();$('html, body').animate({scrollTop:offset.top,scrollLeft:offset.left});oCallout.find('h2').focus();}}
$(document).ready(function(){$("input:checkbox").on("click",function(){checkBoxes(this);});$("input:checkbox").on("keypress",function(){checkBoxes(this);});$("#MailMergeForm_MailMergeForm").submit(function(event){return validateCheckboxes();});setMayorsEnabled(false);});})(jQuery);;

