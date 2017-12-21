


function login() {

   
    var client = new HttpClient();
    var url;
  
  
    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Authenticate?username=" + document.getElementById("uname").value + "&password=" + document.getElementById("pass").value;
      
  

    client.get(url , function (response) {

      
        authenticate(response);
    });
   

}
function authenticate(response)
{
    var data = response.split("authenticate>");
    var authentication = data[1].split("<")[0];
    if (authentication == "true")
        document.location.href = "online-application/id_number.html";
    else
    {
        alert("incorrect login");
        document.getElementById("uname").value = "";
        document.getElementById("pass").value = "";
    }

}
function to_transaction(id_number)
{
    document.location.href = "check_transaction.html?" + id_number;
}

function check() {

    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.getElementById("iduser").value = id_number;
    var client = new HttpClient();
    var url;
  

    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/" + id_number;
    client.get(url, function (response) {

        var data_labor = "";
        if (response.split("id>")[1].split("</")[0] == "0") {
            data_labor = "<li class='fa fa-close' style='color:red;font-size:1.5rem'>&nbsp;رقم الهوية غير صحيح </li>";
            document.getElementById("ID").innerHTML = data_labor;
            document.getElementById("submit").disabled = true;
            document.getElementById("fileToUpload").disabled = true;
            document.getElementById("submit").style.opacity = " 0.75";
            document.getElementById("fileToUpload").style.opacity = " 0.75";

            return true;
        }
        else {
            data_labor = "<i class='fa fa-check' style='color:green;font-size:1.5rem'>&nbsp;تمّ تحميل نسخة عن معلوماتك الشخصية </li>";
            document.getElementById("ID").innerHTML = data_labor;
            url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Labor/" + id_number;
            client.get(url, function (response) {
               
                labor(response, id_number);

            });
            url ="http://93.185.92.53:8080/ForeignWorker/rest/API/Finance/" + id_number;
          

            
         
            client.get(url , function (response,id_number) {
              
             
               finance(response, id_number); 
              
            });

            url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Justice/" + id_number;

            client.get(url, function (response) {
                justice(response, id_number);
              
            });

        }


    });


}

function labor(response, id_number) {
    var data_labor = "";
    
    if (response.split("id>")[1].split("</")[0] == "0")
    {
        document.getElementById("error_message").style.display = "block";
        document.getElementById("submit").disabled = true;
        document.getElementById("fileToUpload").disabled = true;
        document.getElementById("submit").style.opacity = " 0.75";
        document.getElementById("fileToUpload").style.opacity = " 0.75";
        data_labor = "<li class='fa fa-close' style='color:red;font-size:1.5rem'>&nbsp;الرجاء تقديم طلب لدى وزارة العمل &nbsp; <a href='missing_paper/labor.html" + id_number + "'style='font-size:0.9rem'>قم بتقديمه إلكترونباً</a> </li>";
    }
    else {
        data_labor = "<i class='fa fa-check' style='color:green;font-size:1.5rem'>&nbsp;تمّ تحميل طلبك لدى وزارة العمل</li>";
    }
  
    document.getElementById("labor").innerHTML = data_labor;
}

function finance(response, id_number) {
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];

    var data_labor = "<ul style='font-family:Tahoma'>";
    if (response.split("id>")[1].split("</")[0] == "0") {
        document.getElementById("error_message").style.display = "block";
        document.getElementById("submit").disabled = true;
        document.getElementById("fileToUpload").disabled = true;
        document.getElementById("submit").style.opacity = " 0.75";
        document.getElementById("fileToUpload").style.opacity = " 0.75";
        data_labor = "<li class='fa fa-close' style='color:red;font-size:1.5rem'>&nbsp;ليس لديك راتب مسجل في وزارة المالية &nbsp; <a href='missing_paper/finance.html?" + id_number + "'style='font-size:0.9rem'>قم بتسجيله إلكترونباً</a></li></ul>";
    }
    else {
        data_labor = "<i class='fa fa-check'style='color:green;font-size:1.5rem'>&nbsp; تمّ تحميل إفادة براتبك</li></ul>";
    }
    
    document.getElementById("finance").innerHTML = data_labor;
}
function justice(response, id_number) {
    var data_labor = "";
    if (response.split("id>")[1].split("</")[0] == "0") {
        document.getElementById("error_message").style.display = "block";
        document.getElementById("submit").disabled = true;
        document.getElementById("fileToUpload").disabled = true;
        document.getElementById("submit").style.opacity = " 0.75";
        document.getElementById("fileToUpload").style.opacity = " 0.75";
        data_labor = "<li class='fa fa-close' style='color:red;font-size:1.5rem'>&nbsp;الرجاء تقديم تعهد لدى كاتب العدل &nbsp; <a href='missing_paper/justice.html?" + id_number + "'style='font-size:0.9rem'>قم بتقديمه إلكترونباً</a></li>";
    }
    else {
        data_labor = "<i class='fa fa-check' style='color:green;font-size:1.5rem'> &nbsp;تمّ تحميل التعهد لدى كاتب العدل  </li>";
    }
    document.getElementById("justice").innerHTML = data_labor;
}


function all_data_load()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
     var client = new HttpClient();
    var url;
  
    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/" + id_number;
    client.get(url, function (response) {

        all_ID_data(response);
       
    });

    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Labor/" + id_number;
    client.get(url, function (response) {

        all_labor_data(response);
       
    });
   
    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Finance/" + id_number;
    client.get(url, function (response) {

        all_finance_data(response);
      //  alert(response);
    });
    url = "http://93.185.92.53:8080/ForeignWorker/rest/API/Justice/" + id_number;
    client.get(url, function (response) {
        all_justice_data(response);

      
    });
    
    document.getElementById("passport_image").src = processedURl[2];

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

    id_data = "&nbsp; رقم االطلب &nbsp;:&nbsp;" + data[1].split('application_number>')[1].split('<')[0] + "</br>";
    id_data = id_data + "&nbsp; تاريخ تقديم الطلب &nbsp;:&nbsp;" + data[1].split('application_date>')[1].split('<')[0] + "</br>&nbsp; النتيجة &nbsp;:&nbsp;" + data[1].split('result>')[1].split('<')[0] + "</br></br>";
    document.getElementById("labor").innerHTML = id_data;
}

function all_justice_data(response)
{
    var data = response.split("Justice_Record>");

    id_data = "&nbsp; رقم التعهد &nbsp;:&nbsp;" + data[1].split('commitment_number>')[1].split('<')[0] + "</br>";
    id_data = id_data + "&nbsp; تاريخ  التعهد &nbsp;:&nbsp;" + data[1].split('commitment_date>')[1].split('<')[0] + "</br></br>";
    document.getElementById("justice").innerHTML = id_data;
}

function all_finance_data(response)
{
    var data = response.split("Financial_Status>");
    id_data = "&nbsp; الراتب &nbsp;:&nbsp;" + data[1].split('salary>')[1].split('<')[0] + "</br>";
    id_data = id_data + "&nbsp; تاريخ بدء العمل &nbsp;:&nbsp;" + data[1].split('date_start_work>')[1].split('<')[0] + "</br></br>";
    document.getElementById("finance").innerHTML = id_data;
}

function payment()
{
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    document.location.href = "payment.html?" + id_number ;
}


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

function insert_finance_status()
{
   
    var currentURL = window.location.href;
    var processedURl = currentURL.split("?");
    var id_number = processedURl[1];
    var salary=document.getElementById('salary').value;
    var date_start=document.getElementById('date_start_work').value; 
    var client = new HttpClient();
  

    client.get("http://93.185.92.53:8080/ForeignWorker/rest/API/InsertFinance?id=" + id_number + "&&salary=" + salary + "&&date_start=" + date_start, function (response) {
       
    
    });   
setTimeout(function () {  document.location.href = "../check_transaction.html?"+id_number;}, 500);
}



