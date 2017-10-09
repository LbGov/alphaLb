(function($) {

    // socialChannel and socialLink need to be global

    var socialChannel = function(sHref){
        switch(true){
            case (sHref.indexOf('facebook') > -1):
                return 'Facebook';
            case (sHref.indexOf('twitter') > -1):
                return 'Twitter';
            case (sHref.indexOf('mailto') > -1):
                return 'Email';
            default:
                return 'Unknown';
        }
    }

    var socialLink = function(sHref){
        // Facebook has a u= parameter
        // Twitter has a url= parameter
        // Email has a body= parameter which needs trimming
        // If any of these is empty, return the current URL
        var sLink = urlParam(sHref, 'u');
        if (sLink === '')
            sLink = urlParam(sHref, 'url');
        if (sLink === '')
            sLink = urlParam(sHref, 'body');
        if (sLink === '')
            sLink = window.location.href;
        return sLink;
    }

    $(document).ready(function() {

        $(document).on("click", ".gnz-dialog textarea", function(){
            // In the email social dialog, select the email message so it can be manually copied for pasting
            $(this).focus();
            $(this).select();
            // Analytics event
            oGA = new Tracker(false);
            if (typeof oGA !== "undefined") {
                var sVal = $(this).val();
                sVal = sVal.substr(sVal.indexOf('http'));
                oGA.sendEvent(false, 'FlagSocial', 'Email', sVal, 0); // nonInteractive, category, action, label, value
            }
        });

    });

})(jQuery);
