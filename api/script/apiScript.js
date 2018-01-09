

function login() {


    var username = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;

    if (username == "adarwish" && password == "admin") {

        document.getElementById("alert_login").style.display = "none";
        httpGet("secure")

    }
    else {
        if (username == "" || password == "")
        {
           
                alert("please entre the username and the password");
        }
       else  alert("incorrect username or password");

    }

}
function httpGet(state) {
    var client = new HttpClient();
    var url;
    var user_pass = "";
    if (state == "open") {
        url = "http://93.185.92.53:8080/CivilRecord/rest/RecordService/";
    }

    if (state == "semi-open") {
        url = "http://93.185.92.53:8080/CivilRecord/rest/RecordService/Record/";
    }

    if (state == "secure") {
        url = "http://93.185.92.53:8080/CivilRecord/rest/RecordService/SecureRecord?userId=";
        user_pass = "&username=adarwish&password=admin";
    }

    client.get(url + document.getElementById("Number_Id").value + user_pass, function (response) {

        getData(response, state);
    });
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
function getData(response, state) {

    if (state == "open") {
        document.getElementById('list').innerHTML = "";
        document.getElementById('first-name').style.backgroundColor = "black";
        document.getElementById('last-name').style.backgroundColor = "black";
        document.getElementById('father-name').style.backgroundColor = "black";
        document.getElementById('mother-name').style.backgroundColor = "black";
        document.getElementById('date-place-birth').style.backgroundColor = "black";
        document.getElementById('sex').style.backgroundColor = "black";
        document.getElementById('number-place-enrollement').style.backgroundColor = "black";
        document.getElementById('nationality').style.backgroundColor = "black";

        document.getElementById('first-name1').style.backgroundColor = "black";
        document.getElementById('last-name1').style.backgroundColor = "black";
        document.getElementById('father-name1').style.backgroundColor = "black";
        document.getElementById('mother-name1').style.backgroundColor = "black";
        document.getElementById('date-place-birth1').style.backgroundColor = "black";
        document.getElementById('sex1').style.backgroundColor = "black";
        document.getElementById('number-place-enrollement1').style.backgroundColor = "black";
        document.getElementById('nationality1').style.backgroundColor = "black";
        var data = response.split("conviction>");

        if (data[1].split("convicted>")[1].split("<")[0] == "false") {
            var convicted = "لا حكم عليه"
        }
        else
            var convicted = "محكوم"

        document.getElementById('judgment').innerHTML = convicted;
    }
    else {
        document.getElementById('list').innerHTML = "";
        document.getElementById('first-name').style.backgroundColor = "white";
        document.getElementById('last-name').style.backgroundColor = "white";
        document.getElementById('father-name').style.backgroundColor = "white";
        document.getElementById('mother-name').style.backgroundColor = "white";
        document.getElementById('date-place-birth').style.backgroundColor = "white";
        document.getElementById('sex').style.backgroundColor = "white";
        document.getElementById('number-place-enrollement').style.backgroundColor = "white";
        document.getElementById('nationality').style.backgroundColor = "white";

        document.getElementById('first-name1').style.backgroundColor = "white";
        document.getElementById('last-name1').style.backgroundColor = "white";
        document.getElementById('father-name1').style.backgroundColor = "white";
        document.getElementById('mother-name1').style.backgroundColor = "white";
        document.getElementById('date-place-birth1').style.backgroundColor = "white";
        document.getElementById('sex1').style.backgroundColor = "white";
        document.getElementById('number-place-enrollement1').style.backgroundColor = "white";
        document.getElementById('nationality1').style.backgroundColor = "white";

        var data = response.split("personal>");
        // alert(data[1].split("name>")[1]);
        document.getElementById('first-name').value = data[1].split("name>")[1].split("<")[0];
        document.getElementById('last-name').value = data[1].split("lName>")[1].split("<")[0];

        document.getElementById('father-name').value = data[1].split("fName>")[1].split("<")[0];
        document.getElementById('mother-name').value = data[1].split("mName>")[1].split("<")[0];

        document.getElementById('date-place-birth').value = data[1].split("birth>")[1].split("<")[0] + "-" + data[1].split("place>")[1].split("<")[0];
        document.getElementById('sex').value = data[1].split("sex>")[1].split("<")[0];

        document.getElementById('number-place-enrollement').value = data[1].split("num_en>")[1].split("<")[0] + "-" + data[1].split("place_en>")[1].split("<")[0];
        document.getElementById('nationality').value = data[1].split("nationality>")[1].split("<")[0];

        document.getElementById('first-name1').value = data[1].split("name>")[1].split("<")[0];
        document.getElementById('last-name1').value = data[1].split("lName>")[1].split("<")[0];

        document.getElementById('father-name1').value = data[1].split("fName>")[1].split("<")[0];
        document.getElementById('mother-name1').value = data[1].split("mName>")[1].split("<")[0];

        document.getElementById('date-place-birth1').value = data[1].split("birth>")[1].split("<")[0] + "-" + data[1].split("place>")[1].split("<")[0];
        document.getElementById('sex1').value = data[1].split("sex>")[1].split("<")[0];

        document.getElementById('number-place-enrollement1').value = data[1].split("num_en>")[1].split("<")[0] + "-" + data[1].split("place_en>")[1].split("<")[0];
        document.getElementById('nationality1').value = data[1].split("nationality>")[1].split("<")[0];
        if (state == "secure") {
            var count = 0;
            var judgment_data = "";
            var judgments = data[1].split("<judgment>");
            for (i = 1; i < judgments.length; i++) {

                judgment_data = judgment_data + "<label  class='position1'>" + judgments[i].split("date_judgment>")[1].split("<")[0] + "</label>";
                judgment_data = judgment_data + "<label  class='position2' >" + judgments[i].split("court>")[1].split("<")[0] + "</label>";
                judgment_data = judgment_data + "<label  class='position3' >" + judgments[i].split("type_offence>")[1].split("<")[0] + "-" + judgments[i].split("time_punishment>")[1].split("<")[0] + "</label></br>";


            }
            document.getElementById('list').innerHTML = judgment_data;

        }
        if (data[1].split("convicted>")[1].split("<")[0] == "false") {
            var convicted = "لا حكم عليه"
        }
        else
            var convicted = "محكوم"

        document.getElementById('judgment').innerHTML = convicted;
    }

}
