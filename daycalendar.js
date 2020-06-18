window.onload = (function (){document.getElementById("daycalendar").innerHTML=contentDayCalendar})

contentDayCalendar = "HolaMundo"

/* dayScheduler

function dayScheduler() {
    let espaciosCitas = "Paciente: </br> Estado:  "

    let horas2 = [
        "5am",
        " - ",
        "6am",
        " - ",
        "7am",
        " - ",
        "8am",
        " - ",
        "9am",
        " - ",
        "10am",
        " - ",
        "11am",
        " - ",
        "12am",
        " - ",
        "1pm",
        " - ",
        "2pm",
        " - ",
        "3pm",
        " - ",
        "4pm",
        " - ",
        "5pm",
        " - ",
        "6pm",
        " - ",
        "7pm",
        " - ",
        "8pm",
        " - ",
        "9pm",
        " - ",
        "10pm",
        " - ",
    ];
    let horasT2 = horas2.map(officeHours2)
    
    function officeHours2 (hora2) {
        return "<span class='timecontainer'>"+ hora2 +"</span>"
    }
    return contentDayCalendar+="<table><tr id=filahorarios> <td id=displayHoras>" + horasT2.join('') + "</td> <td id=displayCita>"+ espaciosCitas + "</td></tr></table>"
} */