/****** FILE: themes/dia-theme/javascript/feedbackpage.js *****/

(function($){$(document).ready(function(){var sFocus='';if($("#message-good-title").length)
sFocus="#message-good-title"
else if($("#message-bad-title").length)
sFocus="#message-bad-title"
else
sFocus="#feedbackpage-title";$(sFocus).focus();$('form ul.plainselectiongroup input:checked').closest('li').addClass('bordered');$('form ul.plainselectiongroup input').on('change',function(event){toggleCheckRadioStatus('input',$(this));});$('form ul.plainselectiongroup li').on('click',function(event){toggleCheckRadioStatus('li',$(this).find('input'));});$('form ul.plainselectiongroup input').on('focus',function(event){$(this).closest('li').focus();});});function toggleCheckRadioStatus(sSource,oObject){if(typeof oObject!=='undefined'&&oObject.data('change')!==sSource){oObject.data('change',sSource);oObject.closest('ul').find('li').removeClass('bordered');oObject.closest('ul').find('.selectiongroup_item').hide();setTimeout(function(oObj){oObj.data('change','');},200,oObject);switch(oObject.attr('type')){case'checkbox':oObject.prop('checked',!oObject.prop('checked'));oObject.closest('ul').find('li input:checked').closest('li').addClass('bordered');break;case'radio':oObject.closest('li').addClass('bordered');if(oObject.prop('checked')!=='true'){oObject.prop('checked','true');oObject.focus();oObject.closest('li').find('.selectiongroup_item').show();}}}}})(jQuery);;

