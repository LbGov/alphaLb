﻿
/*-------------------------------->authenticate via api <-------------------------------------------*/
function login() {

   
    var client = new HttpClient();
    var url;
  
  
    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/Authenticate?username=" + document.getElementById("uname").value + "&password=" + document.getElementById("pass").value;
      
  

    client.get(url , function (response) {

      
        authenticate(response);
    });
   

}

function authenticate(response)
{
    var data = response.split("authenticated>");
    var authentication = data[1].split("<")[0];
    if (authentication == "true")
    {
        var id_number = response.split("userId>")[1].split("<")[0];
        document.location.href = "online-application/expiry_date.html?" + id_number;
    }
    else
    {
        alert("incorrect login");
        document.getElementById("uname").value = "";
        document.getElementById("pass").value = "";
    }

}

/*->to transaction page to check all documents <-*/
function to_transaction(prior_approval_id)
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.location.href = "check_transaction.html?"+id_number+ "?"+ prior_approval_id;
}

/*----------------------------------->function to check the missing paper<----------------------------------------------------*/
function check() {

    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
  var id_number = processedURl[1];
    var prior_approval_id = processedURl[2];
    document.getElementById("iduser").value = id_number;
    document.getElementById("id-p-a").value = prior_approval_id;
    var client = new HttpClient();
    var url;
  


    url = " http://93.185.92.53:8080/Authentication_Server/rest/API/National_Id/" + id_number;

    client.get(url, function (response) {
    
    var personal_data = "";
    personal_data = "<i class='fa fa-check' style='color:green;font-size:1.5rem'>&nbsp;تمّ تحميل نسخة عن معلوماتك الشخصية </li>";
    document.getElementById("ID").innerHTML = personal_data;
    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/Labor/" + prior_approval_id;
    client.get(url, function (response) {
       
   
        labor(response, prior_approval_id);

    });
            
});
          
}




function labor(response,prior_approval_id) {
    var data_labor = "";
   
    if (response.split("barcode>")[1].split("</")[0] == prior_approval_id) {
             
        data_labor = "<i class='fa fa-check' style='color:green;font-size:1.5rem'>&nbsp;تمّ تحميل طلبك لدى وزارة العمل</li>";


      }
    else {
        document.getElementById("error_message").style.display = "block";
        document.getElementById("submit").disabled = true;
        document.getElementById("fileToUpload").disabled = true;
        document.getElementById("submit").style.opacity = " 0.75";
        document.getElementById("fileToUpload").style.opacity = " 0.75";
        data_labor = "<li class='fa fa-close' style='color:red;font-size:1.5rem'>&nbsp;الرجاء تقديم طلب لدى وزارة العمل &nbsp; </li>";
    
    }
  
    document.getElementById("labor").innerHTML = data_labor;
}

/*----------------------------------------------->load all citizen data via api<-----------------------------------------*/
function all_data_load()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    var prior_approval_id = processedURl[2];
     var client = new HttpClient();
    var url;
  
    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/National_Id/" + id_number;
    client.get(url, function (response) {

        all_ID_data(response);
       
    });

    url = "http://93.185.92.53:8080/Authentication_Server/rest/API/Labor/" + prior_approval_id;
    client.get(url, function (response) {

        all_labor_data(response);
       
    });
   
   
    document.getElementById("passport_image").src = processedURl[3];

}




function all_ID_data(response)
{
    var data = response.split("User_Id>");
   
    var id_data = "<table><tr><td>&nbsp; الإسم: " + data[1].split('first_name>')[1].split('<')[0] + " </td><tr><td>&nbsp; إسم الأب :&nbsp;" + data[1].split('father_name>')[1].split('<')[0] + "</td></tr><tr><td>&nbsp; الشهرة:&nbsp;" + data[1].split('last_name>')[1].split('<')[0] + "</td></tr>";
    id_data = id_data + "<tr><td>&nbsp;إسم الأم و شهرتها :&nbsp;" + data[1].split('mother_name>')[1].split('<')[0] + " " + data[1].split('mother_last_name>')[1].split('<')[0] + "&nbsp;&nbsp;</td></tr>";
    id_data = id_data + "<tr><td>&nbsp;محل الولادة :&nbsp;" + data[1].split('place_birth>')[1].split('<')[0] + "</td></tr><tr><td>&nbsp; تاريخ الولادة:&nbsp; " + data[1].split('date_birth>')[1].split('<')[0] + " </td></tr>";
    id_data = id_data + "<tr><td>&nbsp;رقم السجل :&nbsp;" + data[1].split('number_enrollement>')[1].split('<')[0] + " </td></tr><tr><td> &nbsp;المحلة أو القرية :&nbsp; " + data[1].split('village>')[1].split('<')[0] + "</td></tr>";
    id_data = id_data + "<tr><td>&nbsp;المحافظة :&nbsp;" + data[1].split('governorate>')[1].split('<')[0] + "  </td></tr><tr><td> &nbsp;القضاء :&nbsp; " + data[1].split('kaddaa>')[1].split('<')[0] + " </td></tr> <tr></tr><tr><td> &nbsp;فئة الدم :&nbsp; " + data[1].split('blood_type>')[1].split('<')[0] + "</td></tr><tr><td> &nbsp;رقم الهوية :&nbsp; " + data[1].split('id>')[1].split('<')[0] + "</td></tr>";
    id_data = id_data + "<tr><td>&nbsp;الجنس :&nbsp;" + data[1].split('sex>')[1].split('<')[0] + " </td><td> &nbsp;تاريخ الإصدار :&nbsp; " + data[1].split('release_date>')[1].split('<')[0] + "</td></tr><tr><td> &nbsp;الوضع العائلي :&nbsp; " + data[1].split('marital_status>')[1].split('<')[0] + "</td><td> &nbsp;فئة الدم :&nbsp; " + data[1].split('blood_type>')[1].split('<')[0] + "</td></tr></table></br>";
    document.getElementById("ID").innerHTML = id_data;

}



function all_labor_data(response)
{
    var data = response.split("Labor_Record>");

    id_data = "&nbsp; رقم االطلب &nbsp;:&nbsp;" + data[1].split('barcode>')[1].split('<')[0] + "</br>";
    id_data = id_data + "&nbsp; تاريخ تقديم الطلب &nbsp;:&nbsp;" + data[1].split('registration_date>')[1].split('<')[0] + "</br>&nbsp; النتيجة &nbsp;:&nbsp;" + data[1].split('status>')[1].split('<')[0] + "</br></br>";
    document.getElementById("labor").innerHTML = id_data;
}



function payment()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.location.href = "payment.html?" + id_number ;
}

/*------------------------------>get the api response<--------------------------------------------------*/
var HttpClient = function () {
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



function to_prior_approval()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.location.href = "prior_approval.html?"+id_number ;
}

function to_id_number()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.location.href = "id_number.html?" + id_number;
}


function to_validity()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    var prior_approval_id = processedURl[2];
    var passport_img=processedURl[3];
    document.location.href = "validity.html?" + id_number + "?" + prior_approval_id + "?" + passport_img;
}

function uncheck_yes_no(radioId1) {


    var radioButton = document.getElementById(radioId1);
    if (radioButton.id== "yes")
    {
         document.getElementById("error_message").style.display ="block";
        document.getElementById("continue").disabled = true;
      
        document.getElementById("continue").style.opacity = " 0.75";
       
    }
    if (radioButton.id == "no") {
        document.getElementById("error_message").style.display = "none";
        document.getElementById("continue").disabled = false;
        document.getElementById("continue").style.opacity = "1";
       
    }
    radioButton.checked = false;

  
}


/*-------------------------------->Fill application<-----------------------------------------------*/
function to_request(machine)
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    var prior_approval_id = processedURl[2];
    var passport_img = processedURl[3];

    document.getElementById('passport_validation').style.display = 'block';
    all_data_load();
    /*prior data*/
    document.getElementById("id_number").value = id_number;
    document.getElementById("id_prior_approval").value = prior_approval_id;
    document.getElementById("pass_img").value = passport_img;
   
    if (machine == 'desktop')
    {

          document.getElementById('justice').style.display = 'none';
    

        document.getElementById("label-cause").innerHTML = document.getElementById("cause").value;
        document.getElementById("label-time").innerHTML = document.getElementById("time").value;
        document.getElementById("label-number_prior_approval").innerHTML = document.getElementById("number_prior_approval").value;

        if (document.getElementsByName("radio")[0].checked) {
            document.getElementById("label-residence").innerHTML = "نعم";
        }
        else {
            document.getElementById("label-residence").innerHTML = "كلا";

        }
        document.getElementById("label-fileToUpload").innerHTML = document.getElementById("fileToUpload").value;



        /*employer data*/
        document.getElementById("label-entreprise").innerHTML = document.getElementById("entreprise").value;
        document.getElementById("label-employer-name").innerHTML = document.getElementById("employer-name").value;
        document.getElementById("label-employer-last-name").innerHTML = document.getElementById("employer-last-name").value;
        document.getElementById("label-employer-father-name").innerHTML = document.getElementById("employer-father-name").value;
        document.getElementById("label-employer-mother-name").innerHTML = document.getElementById("employer-mother-name").value;
        document.getElementById("label-employer-nationality").innerHTML = document.getElementById("employer-nationality").value;
        document.getElementById("label-employer-date-bith").innerHTML = document.getElementById("employer-date-bith").value;
        document.getElementById("label-employer-place-bith").innerHTML = document.getElementById("employer-place-bith").value;
        document.getElementById("label-job-w-h").innerHTML = document.getElementById("job-w-h").value;
        document.getElementById("label-province").innerHTML = document.getElementById("province").value;
        document.getElementById("label-city").innerHTML = document.getElementById("city").value;
        document.getElementById("label-street").innerHTML = document.getElementById("street").value;
        document.getElementById("label-building").innerHTML = document.getElementById("building").value;
        document.getElementById("label-phone").innerHTML = document.getElementById("phone").value;
        document.getElementById("label-e-mail").innerHTML = document.getElementById("e-mail").value;

        /*worker data*/

        document.getElementById("label-worker-name").innerHTML = document.getElementById("worker-name").value;
        document.getElementById("label-worker-last-name").innerHTML = document.getElementById("worker-last-name").value;
        document.getElementById("label-worker-father-name").innerHTML = document.getElementById("worker-father-name").value;
        document.getElementById("label-worker-mother-name").innerHTML = document.getElementById("worker-mother-name").value;
        document.getElementById("label-worker-date-birth").innerHTML = document.getElementById("worker-date-birth").value;
        document.getElementById("label-worker-place-birth").innerHTML = document.getElementById("worker-place-birth").value;

        document.getElementById("label-current-nationality").innerHTML = document.getElementById("current-nationality").value;
        document.getElementById("label-original-nationality").innerHTML = document.getElementById("original-nationality").value;

        if (document.getElementsByName("gender")[0].checked) {
            document.getElementById("label-gender").innerHTML = "ذكر";
        }
        else document.getElementById("label-gender").innerHTML = "أنثى";

        document.getElementById("label-worker-job").innerHTML = document.getElementById("worker-job").value;
        document.getElementById("label-relationship").innerHTML = document.getElementById("relationship").value;

        if (document.getElementsByName("passport")[0].checked) {

            document.getElementsByName("label-passport")[0].checked = true;
        }
        else
            if (document.getElementsByName("passport")[1].checked) {

                document.getElementsByName("label-passport")[1].checked = true;
            }
            else
                if (document.getElementsByName("passport")[2].checked) {


                    document.getElementsByName("label-passport")[2].checked = true;
                }

        document.getElementById("label-passport-number").innerHTML = document.getElementById("passport-number").value;

        document.getElementById("label-expiration-date").innerHTML = document.getElementById("expiration-date").value;
        document.getElementById("label-name-age").innerHTML = document.getElementById("name-age").value;


        /*justice writer data*/
        document.getElementById("label-first-last-name").innerHTML = document.getElementById("first-last-name").value;
        document.getElementById("label-department").innerHTML = document.getElementById("department").value;
        document.getElementById("label-casa").innerHTML = document.getElementById("casa").value;

        document.getElementById("label-j-city").innerHTML = document.getElementById("j-city").value;
        document.getElementById("label-commitment-num").innerHTML = document.getElementById("commitment-num").value;
        document.getElementById("label-date").innerHTML = document.getElementById("date").value;


    }
    else
    {
      
     
        document.getElementById('justice-mobile').style.display = 'none';


        document.getElementById("label-cause-mobile").innerHTML = document.getElementById("cause-mobile").value;
        document.getElementById("label-time-mobile").innerHTML = document.getElementById("time-mobile").value;
        document.getElementById("label-number_prior_approval-mobile").innerHTML = document.getElementById("number_prior_approval-mobile").value;

        if (document.getElementsByName("radio-mobile")[0].checked) {
            document.getElementById("label-residence-mobile").innerHTML = "نعم";
        }
        else {
            document.getElementById("label-residence-mobile").innerHTML = "كلا";

        }
        document.getElementById("label-fileToUpload-mobile").innerHTML = document.getElementById("fileToUpload-mobile").value;



        /*employer data*/
        document.getElementById("label-entreprise-mobile").innerHTML = document.getElementById("entreprise-mobile").value;
        document.getElementById("label-employer-name-mobile").innerHTML = document.getElementById("employer-name-mobile").value;
        document.getElementById("label-employer-last-name-mobile").innerHTML = document.getElementById("employer-last-name-mobile").value;
        document.getElementById("label-employer-father-name-mobile").innerHTML = document.getElementById("employer-father-name-mobile").value;
        document.getElementById("label-employer-mother-name-mobile").innerHTML = document.getElementById("employer-mother-name-mobile").value;
        document.getElementById("label-employer-nationality-mobile").innerHTML = document.getElementById("employer-nationality-mobile").value;
        document.getElementById("label-employer-date-bith-mobile").innerHTML = document.getElementById("employer-date-bith-mobile").value;
        document.getElementById("label-employer-place-bith-mobile").innerHTML = document.getElementById("employer-place-bith-mobile").value;
        document.getElementById("label-job-w-h-mobile").innerHTML = document.getElementById("job-w-h-mobile").value;
        document.getElementById("label-province-mobile").innerHTML = document.getElementById("province-mobile").value;
        document.getElementById("label-city-mobile").innerHTML = document.getElementById("city-mobile").value;
        document.getElementById("label-street-mobile").innerHTML = document.getElementById("street-mobile").value;
        document.getElementById("label-building-mobile").innerHTML = document.getElementById("building-mobile").value;
        document.getElementById("label-phone-mobile").innerHTML = document.getElementById("phone-mobile").value;
        document.getElementById("label-e-mail-mobile").innerHTML = document.getElementById("e-mail-mobile").value;

        /*worker data*/
       
        document.getElementById("label-worker-name-mobile").innerHTML = document.getElementById("worker-name-mobile").value;
        document.getElementById("label-worker-last-name-mobile").innerHTML = document.getElementById("worker-last-name-mobile").value;
        document.getElementById("label-worker-father-name-mobile").innerHTML = document.getElementById("worker-father-name-mobile").value;
        document.getElementById("label-worker-mother-name-mobile").innerHTML = document.getElementById("worker-mother-name-mobile").value;
        document.getElementById("label-worker-date-birth-mobile").innerHTML = document.getElementById("worker-date-birth-mobile").value;
        document.getElementById("label-worker-place-birth-mobile").innerHTML = document.getElementById("worker-place-birth-mobile").value;

        document.getElementById("label-current-nationality-mobile").innerHTML = document.getElementById("current-nationality-mobile").value;
        document.getElementById("label-original-nationality-mobile").innerHTML = document.getElementById("original-nationality-mobile").value;

        if (document.getElementsByName("gender-mobile")[0].checked) {
            document.getElementById("label-gender-mobile").innerHTML = "ذكر";
        }
        else document.getElementById("label-gender-mobile").innerHTML = "أنثى";

        document.getElementById("label-worker-job-mobile").innerHTML = document.getElementById("worker-job-mobile").value;
        document.getElementById("label-relationship-mobile").innerHTML = document.getElementById("relationship-mobile").value;

        if (document.getElementsByName("passport-mobile")[0].checked) {

            document.getElementsByName("label-passport-mobile")[0].checked = true;
        }
        else
            if (document.getElementsByName("passport-mobile")[1].checked) {

                document.getElementsByName("label-passport-mobile")[1].checked = true;
            }
            else
                if (document.getElementsByName("passport-mobile")[2].checked) {


                    document.getElementsByName("label-passport-mobile")[2].checked = true;
                }

        document.getElementById("label-passport-number-mobile").innerHTML = document.getElementById("passport-number-mobile").value;

        document.getElementById("label-expiration-date-mobile").innerHTML = document.getElementById("expiration-date-mobile").value;
        document.getElementById("label-name-age-mobile").innerHTML = document.getElementById("name-age-mobile").value;


        /*justice writer data*/
        document.getElementById("label-first-last-name-mobile").innerHTML = document.getElementById("first-last-name-mobile").value;
        document.getElementById("label-department-mobile").innerHTML = document.getElementById("department-mobile").value;
        document.getElementById("label-casa-mobile").innerHTML = document.getElementById("casa-mobile").value;

        document.getElementById("label-j-city-mobile").innerHTML = document.getElementById("j-city-mobile").value;
        document.getElementById("label-commitment-num-mobile").innerHTML = document.getElementById("commitment-num-mobile").value;
        document.getElementById("label-date-mobile").innerHTML = document.getElementById("date-mobile").value;

    }
   
   
 
}

function insert(machine)
{


    if (machine == "desktop") {
        var i = 0;
        document.body.style = " background-color: rgb(0,0,0); ";
        document.body.style = " background-color:rgba(192,192,192,0.1);opacity: 0.4;  ";
        document.getElementById('loader').style = "opacity: 1;";
       

        var client = new HttpClient();
        var url;
        var travel = " ";
        if (document.getElementsByName("passport")[0].checked) {

            travel = "passport";
        }
        else
            if (document.getElementsByName("passport")[1].checked) {

                travel = "travel-document";
            }
            else
                if (document.getElementsByName("passport")[2].checked) {


                    travel = "other";
                }
        var gender = "";

        if (document.getElementsByName("gender")[0].checked) {
            gender = "male";
        }
        else gender = "female";


        url = "http://93.185.92.53:8080/Authentication_Server/rest/API/VisaApplication?";

        url = url + "notary_public_first=" + document.getElementById("first-last-name").value.split(" ")[0] + "&notary_public_last=" + document.getElementById("first-last-name").value.split(" ")[1] + "&notary_public_governorate=" + document.getElementById("department").value + "&notary_public_judiciary=" + document.getElementById("casa").value;
        url = url + "&notary_public_town=" + document.getElementById("j-city").value + "&notary_public_pledge_id=" + document.getElementById("commitment-num").value + "&notary_public_pledge_date=" + document.getElementById("date").value + "&worker_passport_link=" + document.getElementById("pass_img").value;


        url = url + "&sponsor_id=" + document.getElementById("id_number").value + "&request_reason=" + document.getElementById("cause").value + "&stay_duration=" + document.getElementById("time").value + "&pre_approval_id=" + document.getElementById("number_prior_approval").value;


        url = url + "&previous_permit=" + document.getElementsByName("radio")[0].checked + "&previous_permit_link=" + document.getElementById("fileToUpload").value + "&sponsor_organization=" + document.getElementById("entreprise").value + "&sponsor_first=" + document.getElementById("employer-name").value + "&sponsor_last=" + document.getElementById("employer-last-name").value;


        url = url + "&sponsor_father=" + document.getElementById("employer-father-name").value + "&sponsor_mother=" + document.getElementById("employer-mother-name").value + "&sponsor_nationality=" + document.getElementById("employer-nationality").value + "&sponsor_birthdate=" + document.getElementById("employer-date-bith").value + "&sponsor_birthplace=" + document.getElementById("employer-place-bith").value;


        url = url + "&sponsor_profession=" + document.getElementById("job-w-h").value + "&sponsor_governorate=" + document.getElementById("province").value + "&sponsor_judiciary=" + +"&sponsor_town=" + document.getElementById("city").value + "&sponsor_street=" + document.getElementById("street").value;

        url = url + "&sponsor_building=" + document.getElementById("building").value + "&sponsor_phone=" + document.getElementById("phone").value + "&sponsor_email=" + document.getElementById("e-mail").value + "&worker_first=" + document.getElementById("worker-name").value + "&worker_last=" + document.getElementById("worker-last-name").value;

        url = url + "&worker_father=" + document.getElementById("worker-father-name").value + "&worker_mother=" + document.getElementById("worker-mother-name").value + "&worker_birthday=" + document.getElementById("worker-date-birth").value + "&worker_current_nationality=" + document.getElementById("current-nationality").value + "&worker_previous_nationality=" + document.getElementById("original-nationality").value;

        url = url + "&worker_sex=" + gender + "&worker_profession=" + document.getElementById("worker-job").value + "&worker_to_sponsor_relationship=" + document.getElementById("relationship").value;

        url = url + "&worker_travel_document_number=" + travel + "&worker_companion_name=" + document.getElementById("name-age").value.split("-")[0] + "&worker_companion_age=" + document.getElementById("name-age").value.split("-")[1];

        client.get(url, function (response) {
            document.getElementById('loader').style.visibility = "hidden";
            document.body.style = " background-color:white;opacity: 1; ";

        });
    }
    else
    {
   
       
        var client = new HttpClient();
        var url;
        var travel = " ";
        if (document.getElementsByName("passport-mobile")[0].checked) {

            travel = "passport";
        }
        else
            if (document.getElementsByName("passport-mobile")[1].checked) {

                travel = "travel-document";
            }
            else
                if (document.getElementsByName("passport-mobile")[2].checked) {


                    travel = "other";
                }
        var gender = "";

        if (document.getElementsByName("gender-mobile")[0].checked) {
            gender = "male";
        }
        else gender = "female";


        url = "http://93.185.92.53:8080/Authentication_Server/rest/API/VisaApplication?";

        url = url + "notary_public_first=" + document.getElementById("first-last-name-mobile").value.split(" ")[0] + "&notary_public_last=" + document.getElementById("first-last-name-mobile").value.split(" ")[1] + "&notary_public_governorate=" + document.getElementById("department-mobile").value + "&notary_public_judiciary=" + document.getElementById("casa-mobile").value;
        url = url + "&notary_public_town=" + document.getElementById("j-city-mobile").value + "&notary_public_pledge_id=" + document.getElementById("commitment-num-mobile").value + "&notary_public_pledge_date=" + document.getElementById("date-mobile").value + "&worker_passport_link=" + document.getElementById("pass_img").value;


        url = url + "&sponsor_id=" + document.getElementById("id_number").value + "&request_reason=" + document.getElementById("cause-mobile").value + "&stay_duration=" + document.getElementById("time-mobile").value + "&pre_approval_id=" + document.getElementById("number_prior_approval-mobile").value;


        url = url + "&previous_permit=" + document.getElementsByName("radio-mobile")[0].checked + "&previous_permit_link=" + document.getElementById("fileToUpload-mobile").value + "&sponsor_organization=" + document.getElementById("entreprise-mobile").value + "&sponsor_first=" + document.getElementById("employer-name-mobile").value + "&sponsor_last=" + document.getElementById("employer-last-name-mobile").value;


        url = url + "&sponsor_father=" + document.getElementById("employer-father-name-mobile").value + "&sponsor_mother=" + document.getElementById("employer-mother-name-mobile").value + "&sponsor_nationality=" + document.getElementById("employer-nationality-mobile").value + "&sponsor_birthdate=" + document.getElementById("employer-date-bith-mobile").value + "&sponsor_birthplace=" + document.getElementById("employer-place-bith-mobile").value;

      
        url = url + "&sponsor_profession=" + document.getElementById("job-w-h-mobile").value + "&sponsor_governorate=" + document.getElementById("province-mobile").value + "&sponsor_judiciary=" + +"&sponsor_town=" + document.getElementById("city-mobile").value + "&sponsor_street=" + document.getElementById("street-mobile").value;

        url = url + "&sponsor_building=" + document.getElementById("building-mobile").value + "&sponsor_phone=" + document.getElementById("phone-mobile").value + "&sponsor_email=" + document.getElementById("e-mail-mobile").value + "&worker_first=" + document.getElementById("worker-name-mobile").value + "&worker_last=" + document.getElementById("worker-last-name-mobile").value;
 
        url = url + "&worker_father=" + document.getElementById("worker-father-name-mobile").value + "&worker_mother=" + document.getElementById("worker-mother-name-mobile").value + "&worker_birthday=" + document.getElementById("worker-date-birth-mobile").value + "&worker_current_nationality=" + document.getElementById("current-nationality-mobile").value + "&worker_previous_nationality=" + document.getElementById("original-nationality-mobile").value;

        url = url + "&worker_sex=" + gender + "&worker_profession=" + document.getElementById("worker-job-mobile").value + "&worker_to_sponsor_relationship=" + document.getElementById("relationship-mobile").value;

        url = url + "&worker_travel_document_number=" + travel + "&worker_companion_name=" + document.getElementById("name-age-mobile").value.split("-")[0] + "&worker_companion_age=" + document.getElementById("name-age-mobile").value.split("-")[1];

        client.get(url, function (response) {
            document.getElementById("validation2").style.display = "none";
            document.getElementById("previous2").style.display = "none";
            document.getElementById("pay2").style.display = "block";
        });

    }
    document.getElementById("validation").style.display = "none";
    document.getElementById("previous1").style.display = "none";
    document.getElementById("pay").style.display = "block";

}