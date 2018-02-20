function login() {

    var client = new HttpClientPost(null);
    var url;

   
    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/Authenticate?username=" + document.getElementById("uname").value + "&password=" + document.getElementById("pass").value;



    client.get(url, function (response) {


        authenticate(response);
    });


}

function authenticate(response) {
    var data = response.split("authenticated>");
    var authentication = data[1].split("<")[0];
    if (authentication == "true") {
        var id_number = response.split("userId>")[1].split("<")[0];
        document.location.href = "apply-online/stolenPass.html?" + id_number;
    }
    else {
        alert("incorrect login");
        document.getElementById("uname").value = "";
        document.getElementById("pass").value = "";
    }

}

function httpPost() {
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];

    var sex;
    if (document.getElementsByName('gender')[0].checked)
        sex = "male";
    else
        sex = "female"

    var identification;

    if (document.getElementsByName('identification-used')[0].checked)
        identification = "Id";
    else
        identification = "other"
 
    var xml = "<PassportApplication>"+
      "<first_name>"+ document.getElementById('first-name').value +"</first_name>"+
      "<last_name>" + document.getElementById('last-name').value + "</last_name>" +
      "<father_name>" + document.getElementById('father-name').value + "</father_name>" + 

      "<mother_full_name>" + document.getElementById('mother-full-name').value + "</mother_full_name>" +
      "<birth_place>" + document.getElementById('birth-place').value + "</birth_place>" +
      "<birth_date>" + document.getElementById('birth-date').value + "</birth_date>" +
      "<registration_place>" + document.getElementById('registration-place').value + "</registration_place>" +
      "<registration_number>" + document.getElementById('registration-number').value + "</registration_number>" +
      "<sex>" + sex + "</sex>" + 
 
      "<governorate>" + document.getElementById('governorate').value + "</governorate>" +
      "<judiciary>" + document.getElementById('judiciary').value + "</judiciary>" +
      "<town>" + document.getElementById('town').value + "</town>" +
      "<street>" + document.getElementById('street').value + "</street>" +
      "<building>" + document.getElementById('building').value + "</building>" +
      "<home_phone>" + document.getElementById('home-phone').value + "</home_phone>" +
      "<mobile_phone>" + document.getElementById('mobile-phone').value + "</mobile_phone>" +
      "<email>" + document.getElementById('email').value + "</email>" + 
      "<use_husband_name>" + document.getElementsByName("use-husband-name")[0].checked + "</use_husband_name>" +
      "<marital_status>" + document.getElementById('marital_status').value + "</marital_status>" +
      "<husband_first_name>" + document.getElementById('husband-first-name').value + "</husband_first_name>" +
      "<husband_last_name>" + document.getElementById('husband-last-name').value + "</husband_last_name>" +
      "<husband_nationality>" + document.getElementById('husband-nationality').value + "</husband_nationality>" +
      "<show_profession>" + document.getElementsByName("show-profession")[0].checked + "</show_profession>" + 
      "<profession>" + document.getElementById('profession').value + "</profession>" +
      "<identification_used>" + identification + "</identification_used>" +
      "<identification_number>" + document.getElementById('identification-number').value + "</identification_number>" +
      "<identification_date>" + document.getElementById('identification-date').value + "</identification_date>" +
      "<identification_civil_status_division>" + document.getElementById('identification-civil-status-division').value + "</identification_civil_status_division>" +
      "<old_passport_included>" + document.getElementsByName('old-passport-included')[0].checked + "</old_passport_included>" +
      "<old_passport_number>" + document.getElementById('old-passport-number').value + "</old_passport_number>" +
      "<old_passport_date>" + document.getElementById('old-passport-date').value + "</old_passport_date>" +
    
      "<travel_permission_included>" + document.getElementsByName('travel-permission-included')[0].checked + "</travel_permission_included>" +
      "<travel_permission_number>" + document.getElementById('travel-permission-number').value + "</travel_permission_number>" +
      "<travel_permission_date>" + document.getElementById('travel-permission-date').value + "</travel_permission_date>" +
      "<travel_permission_source>" + document.getElementById('travel-permission-source').value + "</travel_permission_source>" +
      "<minor_guardianship_ruling_included>" + document.getElementsByName('minor-guardianship-ruling-included')[0].checked + "</minor_guardianship_ruling_included>" +
      "<minor_guardianship_ruling_number>" + document.getElementById('minor-guardianship-ruling-number').value + "</minor_guardianship_ruling_number>" +
      "<minor_guardianship_ruling_date>" + document.getElementById('minor-guardianship-ruling-date').value + "</minor_guardianship_ruling_date>" +
      "<minor_guardianship_ruling_source>" + document.getElementById('minor-guardianship-ruling-source').value + "</minor_guardianship_ruling_source>" +
    "</PassportApplication>";
    var client = new HttpClientPost(xml);
    var url = "http://93.185.92.53:8080/Authentication_Server/rest/API/PassportApplication";
    client.post(url, function (response) {
     
        document.location.href = "document.html?" + id_number;
    });
}


function httpPost_mobile()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];

    var sex;
    if (document.getElementsByName('gender-mobile')[0].checked)
        sex = "male";
    else
        sex = "female"

    var identification;

    if (document.getElementsByName('identification-used-mobile')[0].checked)
        identification = "Id";
    else
        identification = "other"

    var xml = "<PassportApplication>" +
      "<first_name>" + document.getElementById('first-name-mobile').value + "</first_name>" +
      "<last_name>" + document.getElementById('last-name-mobile').value + "</last_name>" +
      "<father_name>" + document.getElementById('father-name-mobile').value + "</father_name>" +

      "<mother_full_name>" + document.getElementById('mother-full-name-mobile').value + "</mother_full_name>" +
      "<birth_place>" + document.getElementById('birth-place-mobile').value + "</birth_place>" +
      "<birth_date>" + document.getElementById('birth-date-mobile').value + "</birth_date>" +
      "<registration_place>" + document.getElementById('registration-place-mobile').value + "</registration_place>" +
      "<registration_number>" + document.getElementById('registration-number-mobile').value + "</registration_number>" +
      "<sex>" + sex + "</sex>" +

      "<governorate>" + document.getElementById('governorate-mobile').value + "</governorate>" +
      "<judiciary>" + document.getElementById('judiciary-mobile').value + "</judiciary>" +
      "<town>" + document.getElementById('town-mobile').value + "</town>" +
      "<street>" + document.getElementById('street-mobile').value + "</street>" +
      "<building>" + document.getElementById('building-mobile').value + "</building>" +
      "<home_phone>" + document.getElementById('home-phone-mobile').value + "</home_phone>" +
      "<mobile_phone>" + document.getElementById('mobile-phone-mobile').value + "</mobile_phone>" +
      "<email>" + document.getElementById('email-mobile').value + "</email>" +
      "<use_husband_name>" + document.getElementsByName("use-husband-name-mobile")[0].checked + "</use_husband_name>" +
      "<marital_status>" + document.getElementById('marital_status-mobile').value + "</marital_status>" +
      "<husband_first_name>" + document.getElementById('husband-first-name-mobile').value + "</husband_first_name>" +
      "<husband_last_name>" + document.getElementById('husband-last-name-mobile').value + "</husband_last_name>" +
      "<husband_nationality>" + document.getElementById('husband-nationality-mobile').value + "</husband_nationality>" +
      "<show_profession>" + document.getElementsByName("show-profession-mobile")[0].checked + "</show_profession>" +
      "<profession>" + document.getElementById('profession-mobile').value + "</profession>" +
      "<identification_used>" + identification + "</identification_used>" +
      "<identification_number>" + document.getElementById('identification-number-mobile').value + "</identification_number>" +
      "<identification_date>" + document.getElementById('identification-date-mobile').value + "</identification_date>" +
      "<identification_civil_status_division>" + document.getElementById('identification-civil-status-division-mobile').value + "</identification_civil_status_division>" +
      "<old_passport_included>" + document.getElementsByName('old-passport-included-mobile')[0].checked + "</old_passport_included>" +
      "<old_passport_number>" + document.getElementById('old-passport-number-mobile').value + "</old_passport_number>" +
      "<old_passport_date>" + document.getElementById('old-passport-date-mobile').value + "</old_passport_date>" +

      "<travel_permission_included>" + document.getElementsByName('travel-permission-included-mobile')[0].checked + "</travel_permission_included>" +
      "<travel_permission_number>" + document.getElementById('travel-permission-number-mobile').value + "</travel_permission_number>" +
      "<travel_permission_date>" + document.getElementById('travel-permission-date-mobile').value + "</travel_permission_date>" +
      "<travel_permission_source>" + document.getElementById('travel-permission-source-mobile').value + "</travel_permission_source>" +
      "<minor_guardianship_ruling_included>" + document.getElementsByName('minor-guardianship-ruling-included-mobile')[0].checked + "</minor_guardianship_ruling_included>" +
      "<minor_guardianship_ruling_number>" + document.getElementById('minor-guardianship-ruling-number-mobile').value + "</minor_guardianship_ruling_number>" +
      "<minor_guardianship_ruling_date>" + document.getElementById('minor-guardianship-ruling-date-mobile').value + "</minor_guardianship_ruling_date>" +
      "<minor_guardianship_ruling_source>" + document.getElementById('minor-guardianship-ruling-source-mobile').value + "</minor_guardianship_ruling_source>" +
    "</PassportApplication>";
 
    var client = new HttpClientPost(xml);
    var url = "http://93.185.92.53:8080/Authentication_Server/rest/API/PassportApplication";
    client.post(url, function (response) {

        document.location.href = "document.html?"+id_number;
    });
}

function check() {

    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
   

    var client = new HttpClientPost();
    var url;



    url = " http://93.185.92.53:8080/Authentication_Server/rest/API/National_Id/" + id_number;

    client.get(url, function (response) {
        if (response.split('id>')[1].split('</')[0] == "0")
        {
            document.getElementById("id_copy").innerHTML = "<li>copy of the identity card</li>";
        }
        else{
        var personal_data = "";
        personal_data = "<i class='fa fa-check' style='color:green;font-size:1.5rem'>&nbsp;A copy of your personal information has been uploaded </li>";
        document.getElementById("ID").innerHTML = personal_data;
     }

    });

}

var HttpClientPost = function (xml) {
    this.post = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("POST", aUrl, true);
        anHttpRequest.send(xml);
    }
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}
function pass_authentication()
{
  
    var pass_id = document.getElementById("Number_Pass").value;
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];


    var client = new HttpClientPost();
    var url;



    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/BiometricPassport/" + pass_id;

    client.get(url, function (response) {
        if (response.split('biometricPassportExists>')[1].split('</')[0] == "false") {
            alert("Passport number incorrect");
        }
        else {
            document.location.href = "recentPhoto.html?" + id_number;
           
        }

    });


}
function save_id() {
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    document.getElementById("id").value = processedURl[1];
}