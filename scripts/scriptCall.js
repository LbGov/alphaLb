  var i = 1;
        var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date();

        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        var currDay = d.getDate();
        var m = currMonth;
        var y = currYear;
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();

        function showDiv() {

            if (i == 1) {
                i = 0;

                var box = document.getElementById('welcomeDiv');
                box.classList.add("move");
                var table = document.getElementById('tbl');
                table.classList.add("table-move");
                var title = document.getElementById('title');
                title.classList.add("table-move");
                var cal = document.getElementById('cal');

                cal.style.display = "none";


            }

            else {
                i = 1;

                var box = document.getElementById('welcomeDiv');
                box.classList.remove("move");
                var table = document.getElementById('tbl');
                table.classList.remove("table-move");
                var title = document.getElementById('title');
                title.classList.remove("table-move");
                var cal = document.getElementById('cal');

                window.setTimeout(function () { cal.style.display = "block"; }, 500);

            }

        }
        function test() {
            if (i == 1) {
                i = 0;
                popup('Today');
                var box = document.getElementById('calendar');
                box.classList.add("move-cal");
                $(document).scroll(function () {
                    checkOffset();
                });
                function checkOffset() {
                    if ($('#calendar').offset().top + $('#calendar').height() > $('#footer').offset().top)
                    {

                        document.getElementById('calendar').classList.remove('call');
                        document.getElementById('calendar').style.top = "1200px";
                        $('#calendar').css('position', 'absolute');
                       
                      } 
                    if ($(document).scrollTop() + window.innerHeight < $('#footer').offset().top)
                    { $('#calendar').css('position', 'fixed'); document.getElementById('calendar').style.top = "160px"; }// restore when you scroll up
                }
                document.getElementById('calendar').classList.add('call');
               
                var table = document.getElementById('tbl');
                table.classList.add("table-move2");
                var title = document.getElementById('title');
                title.classList.add("table-move2");
                var button = document.getElementById('floating-button');
                button.style.display = "none";
                var cal = document.getElementById('cal');
                cal.classList.add("table-move2");

            }

            else {
                i = 1;
                var box = document.getElementById('calendar');
                box.classList.remove("move-cal");
                var table = document.getElementById('tbl');
                table.classList.remove("table-move2");
                var title = document.getElementById('title');
                title.classList.remove("table-move2");
                var button = document.getElementById('floating-button');
                button.style.display = "block";
                var cal = document.getElementById('cal');
                cal.classList.remove("table-move2");
                calendar('Today');

            }
        }


        var DaysOfWeek = [
             'Sun',
             'Mon',
             'Tue',
             'Wed',
             'Thu',
             'Fri',
             'Sat'
        ];

        // Months, stating on January

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
            calendar('');
             
        }

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
            calendar('');
 
        }

        function showDay(day,month,i)
        {
            currMonth = month-1;
            m = month-1;
            chkM = month-1 ;
            currDay = day;
            calendar(i);
            currMonth = d.getMonth();
            currDay = d.getDate();
            m = currMonth;
            y = currYear;
            chkM = chk.getMonth();
            

        }

        function calendar(w) {

            // Start calendar

           
            // Set the current month, year


            // First day of the week in the selected month
            var firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
            // Last day of the selected month
            var lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            // Last day of the previous month
            var lastDayOfLastMonth = currMonth == 0 ? new Date(currYear - 1, 11, 0).getDate() : new Date(currYear, currMonth, 0).getDate();


            var html = '<table class="tbl">';

            // Write selected month and year
            html += '<thead><tr>';
            html += '<td class="style2" colspan="7">' + Months[currMonth] + ' ' + y + '</td>';
            html += '</tr></thead>';


            // Write the header of the days of the week
            html += '<tr class="days">';
            for (var i = 0; i < DaysOfWeek.length; i++) {
                html += '<td class="style2">' + DaysOfWeek[i] + '</td>';
            }
            html += '</tr>';

            // Write the days
            var i = 1;
            do {

                var dow = new Date(currYear, currMonth, i).getDay();

                // If Sunday, start new row
                if (dow == 0) {
                    html += '<tr>';
                }
                    // If not Sunday but first day of the month
                    // it will write the last days from the previous month
                else if (i == 1) {
                    html += '<tr>';
                    var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                    for (var j = 0; j < firstDayOfMonth; j++) {
                        html += '<td class=" style2 not-current">' + k + '</td>';
                        k++;
                    }
                }

                // Write the current day in the loop
               
                if (chkY == currYear && chkM == currMonth && i == currDay) {
                    html += "<td class='style2 today popup' onclick='popup(" + '"' + w + '"' + ")'>" + i + '   <span class="popuptext" id="myPopup"></span> </td>';
                } else {
                    html += '<td class="style2 normal">' + i + '</td>';
                }
                // If Saturday, closes the row
                if (dow == 6) {
                    html += '</tr>';
                }
                    // If not Saturday, but last day of the selected month
                    // it will write the next few days from the next month
                else if (i == lastDateOfMonth) {
                    var k = 1;
                    for (dow; dow < 6; dow++) {
                        html += '<td class=" style2 not-current">' + k + '</td>';
                        k++;
                    }
                }

                i++;
            } while (i <= lastDateOfMonth);

            // Closes table
            html += '</table>';

            // Write HTML to the div
            document.getElementById("divCal").innerHTML = html;
        }
        function popup(j) {
         
                var popup = document.getElementById("myPopup");
                popup.classList.toggle("show");
                popup.innerHTML = j;
            
        }