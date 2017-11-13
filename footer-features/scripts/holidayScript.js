
/*-------------------------------------------------------------------function to show the description table---------------------------------------------------------------------*/
        function showDesc() {

            var cal = document.getElementById('cal');
            var box = document.getElementById('description');
            var table = document.getElementById('tbl');
            var title = document.getElementById('title');
            var btn = document.getElementById("floating-button");
           
            if ( btn.value == "1") {

                btn.value = "0";
                box.classList.add("move-description");
                table.classList.add("table-move");
                title.classList.add("table-move");
                btn.style.transform = "rotate(45deg)";
                cal.classList.add("table-move");
                cal.disabled = true;

            }
            else {
                btn.value = "1";
                btn.style.transform = "rotate(0deg)";
                box.classList.remove("move-description");
                table.classList.remove("table-move");
                title.classList.remove("table-move");
                cal.classList.remove("table-move");
                cal.disabled = false;
            }
           

        }
/*-------------------------------------------------------------------function to show the Calendar-------------------------------------------------------------------------*/
        function showCall(status) {

            var box = document.getElementById('calendar');
            var table = document.getElementById('tbl');
            var title = document.getElementById('title');
            var button = document.getElementById('floating-button');
            var cal = document.getElementById('cal');

            if (status == "1") {
               
                popup('Today');
                box.classList.add("move-cal");
      //-------to scroll the calendar while we scrolling up and down

                $(document).scroll(function () {
                    checkOffset();
                });
                function checkOffset() {
                    if ($('#calendar').offset().top + $('#calendar').height() > $('#footer').offset().top)
                    {

                        document.getElementById('calendar').classList.remove('call');
                        document.getElementById('calendar').style.top = "1100px";
                        $('#calendar').css('position', 'absolute');
                       
                      } 
                    if ($(document).scrollTop() + window.innerHeight < $('#footer').offset().top)
                    { $('#calendar').css('position', 'fixed'); document.getElementById('calendar').style.top = "160px"; }// restore when you scroll up
                }

                document.getElementById('calendar').classList.add('call');
                table.classList.add("table-move2");
                title.classList.add("table-move2");
                button.style.display = "none";
                cal.classList.add("table-move2");
            }

            else {
               
               box.classList.remove("move-cal");
                table.classList.remove("table-move2");
                title.classList.remove("table-move2");
                button.style.display = "block";
                cal.classList.remove("table-move2");
                today();

            }
        }

/*---------------------------------------------------------------------------calendar functions----------------------------------------------------------------------*/
var d = new Date();
            var currMonth = d.getMonth();
            var currYear = d.getFullYear();
            var currDay = d.getDate();
            var m = currMonth;
            var y = currYear;
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
// to display previews months
        function prev() {

            
            if (currMonth == 0) {
                currMonth = 11;
                m = 11;
                currYear = currYear - 1;
                y = y - 1;
            }
            else {
                currMonth = currMonth - 1;
                m = m - 1;
            }
           
            calendar('', m, y, currMonth, currYear, currDay, chkY, chkM);
             
        }

// to display next months
        function next() {
            
            if (currMonth == 11) {
                currMonth = 0;
                currYear = currYear + 1;
                y = y + 1
            }
            else {
                currMonth = currMonth + 1;
                m = m + 1
            }
            calendar('', m, y, currMonth, currYear, currDay, chkY, chkM);
 
        }
// show feast day
        function showDay(day,month,i)
        {
            var d = new Date();
            var currMonth = d.getMonth();
            var currYear = d.getFullYear();
            var currDay = d.getDate();
            var m = currMonth;
            var y = currYear;
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            currMonth = month-1;
            m = month-1;
            chkM = month-1 ;
            currDay = day;
            calendar(i, m, y, currMonth, currYear, currDay, chkY, chkM);
        }

        function today()
        {
            var d = new Date();
            var currMonth = d.getMonth();
            var currYear = d.getFullYear();
            var currDay = d.getDate();
            var m = currMonth;
            var y = currYear;
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            calendar('Today',m,y, currMonth, currYear, currDay, chkY, chkM);

        }
 // organise calendar
        function calendar(w, m, y, currMonth, currYear, currDay, chkY, chkM) {

            var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var DaysOfWeek = [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
            ];

            var firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
            var lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            var lastDayOfLastMonth = currMonth == 0 ? new Date(currYear - 1, 11, 0).getDate() : new Date(currYear, currMonth, 0).getDate();
            var html = '<table class="tbl">';
            html += '<thead><tr>';
            html += '<td class="style2" colspan="7">' + Months[currMonth] + ' ' + y + '</td>';
            html += '</tr></thead>';
            html += '<tr class="days">';
            for (var i = 0; i < DaysOfWeek.length; i++) {
                html += '<td class="style2">' + DaysOfWeek[i] + '</td>';
            }
            html += '</tr>';
            var i = 1;
            do {

                var dow = new Date(currYear, currMonth, i).getDay();
                if (dow == 0) {
                    html += '<tr>';
                }
                   
                else if (i == 1) {
                    html += '<tr>';
                    var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                    for (var j = 0; j < firstDayOfMonth; j++) {
                        html += '<td class=" style2 not-current">' + k + '</td>';
                        k++;
                    }
                }

                if (chkY == currYear && chkM == currMonth && i == currDay) {
                    html += "<td class='style2 today popup' onclick='popup(" + '"' + w + '"' + ")'>" + i + '   <span class="popuptext" id="myPopup"></span> </td>';
                } else {
                    html += '<td class="style2 normal">' + i + '</td>';
                }
                if (dow == 6) {
                    html += '</tr>';
                }
                  
                else if (i == lastDateOfMonth) {
                    var k = 1;
                    for (dow; dow < 6; dow++) {
                        html += '<td class=" style2 not-current">' + k + '</td>';
                        k++;
                    }
                }

                i++;
            } while (i <= lastDateOfMonth);

            html += '</table>';
            document.getElementById("divCal").innerHTML = html;
        }
/*---------------------------------------------------------------------popup show function--------------------------------------------------------------*/
        function popup(j) {
         
                var popup = document.getElementById("myPopup");
                popup.classList.toggle("show");
                popup.innerHTML = j;
            
        }