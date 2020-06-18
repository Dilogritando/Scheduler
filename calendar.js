let dateMin = "2020/01/01";
let dateMax = "2021/01/01";
let calendarShow = 1; 
let weekNumber = 1; 

/* let appointment = {
    psy: ID,
    user: ID,
    service: String, // Servicio
    start_time: Date, // Inicio de cita
    end_time: Date, // Fin de cita
    duration: Number, // Duración de la cita
    cost: Number, // Precio real
	totalPayed: Number, // Cantidad que el usuario pago.
    currency: String,
	payed: Boolean,
	status: String // ['Activa', 'Cancelada', 'Pendiente', 'Reagenda']
}
let cita = (appointment) {
    Psiclogo=psy,
    Paciente=user: ID,
    Servicio=service: String, // Servicio
    Inicio=start_time: Date, // Inicio de cita
    Fin=end_time: Date, // Fin de cita
    Duración=duration: Number, // Duración de la cita
    Precio=cost: Number, // Precio real
	Pagado=totalPayed: Number, // Cantidad que el usuario pago.
    Moneda=currency: String,
	Confirmado=payed: Boolean,
	Estado=status: String // ['Activa', 'Cancelada', 'Pendiente', 'Reagenda']
} */

let horas = [
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

let emptySlot = "<div id=emptySlot> CITA!! </div>"

let horasT = horas.map(officeHours)

function officeHours (hora) {
    return "<span class='timecontainer'>"+ hora +"</span>"
}

function espaciosCitas(){
    return "Paciente: </br> Estado:  "
    /* if (  //El api trajo info de cita// ) {
       return "Paciente: </br> Estado:  " 
    } else {
        return "  "
    } */
}

function dayScheduler(){
    return "<table><tr id=filahorarios> <td id=displayHoras>" + horasT.join('') + "</td> <td id=displayCita>"+ espaciosCitas + "</td></tr></table>"
}

function settingDays(date, day){
    date = new Date(date);
    date.setDate(day);
    return date;
}

function timeLapse(dateMin, dateMax) {
    let stamp1 = new Date(dateMin);
    let stamp2 = new Date(dateMax);
    date1 = settingDays(dateMin,31);
    date2 = settingDays(dateMax,31);
    let temp;
    let dates = [];
   
    while (date1 <= date2)
    {
        if (date1.getDate() != 31) 
        {
            temp = settingDays(date1, 0);
            if (temp >= stamp1 && temp <= stamp2) 
            dates.push(temp);
            date1 = settingDays(date1, 31);
        } else {
            temp = new Date(date1);
            if (temp >= stamp1 && temp <= stamp2) 
            dates.push(temp);
            date1.setMonth(date1.getMonth() + 1);
        }
    } /* Este cierra el while */
    let content = " ";
    let weekDays = [
        {shortD:"Mon", fullD:"Lunes"}, 
        {shortD:"Tue", fullD:"Martes"}, 
        {shortD:"Wed", fullD:"Miércoles"}, 
        {shortD:"Thu", fullD:"Jueves"}, 
        {shortD:"Fri", fullD:"Viernes"}, 
        {shortD:"Sat", fullD:"Sábado"}, 
        {shortD:"Sun", fullD:"Domingo"}
    ];
    let lastDate, firstDate;
    for(let i=0; i<dates.length; i++){
        lastDate=dates[i];
        firstDate= new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
        let monthO = (firstDate.toString().split(" ")[1]);
        let traduccion = {
            Jan: "Ene",
            Apr: "Abr",
            Aug: "Ago",
            Dec: "Dic"
        }; 
        let mes =monthO.replace(/Jan|Apr|Aug|Dec/gi, function(matched){ return traduccion[matched];
        });
        content+="<div id='calendarGrid_"+ (i+1) + "' class='calendarDiv''>";
        content+="<div class='calendarBtns'><button id='prevBtn' onclick='callprev()'> < Atrasar mes </button><h2>"+ mes + "-"+ firstDate.getFullYear() +"</h2> <button id='nextBtn' onclick='callnext()'> Adelantar mes > </button> </div>"; 
        /* content+=dayScheduler; */
        content+="<table class='calendarTable'>";
        content+="<thead >";
        weekDays.map(item=>{
            content+="<th >"+item.fullD+"</th>";
        });
        content+="</thead>";
        content+="<tbody >";
        let d = 1;
        let displayNum; 
        let sn=0;
        while (d <= lastDate.getDate() ) {
            /* if (ya hay un tr con id semana){ document.getElementsByClassName(".semana")style.display="none"} */
            sn++;
            content += "<tr class='semanas' id='semanaNo_" + sn + "'>"; 
            
            for (k = 0; k < 7; k++) {
                displayNum = d < 10 ? "0" + d : d;
                if (d==1){
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortD) {  
                        content += "<td id='dayCell'>" + "<div id='dayDisplay'>" + displayNum + "</div>" + 
                        "<div id='cellContent'> <div id='hora'>" + horasT.join('') +
                        " </div> <div id='openSlot'>" + emptySlot +" </div> </div>" + "</td>";
                        d++;
                    } else {
                        content += "<td></td>";
                    }
                } else if (d>lastDate.getDate()) {
                    content += "<td></td>";
                } else {
                    content += "<td id='dayCell'>" + "<div id='dayDisplay'>" + displayNum + "</div>" + "<div id='cellContent'> <div id='hora'>" + horasT.join('') + "</div> <div id='openSlot'>" + emptySlot +"</div> </div>" + "</td>";
                    d++;
                }
            }
            content += "</tr>";
        }         
        content+="</tbody>";
        content+="</table>";
        content+="<div class='weekBtns'> <button id='prevWeek' onclick='prevWeek()'> < Atrasar semana </button> <button id='nextWeek' onclick='nextWeek()'> Adelantar semana > </button> </div>";
        content += "</div>";
    }
    return content;
} /* este cierra el function timelapse */

function callprev(){
    let alltable=document.getElementsByClassName("calendarDiv");
    calendarShow--;
    if (calendarShow>=1){
        for(let i=0; i <alltable.length; i++) {
            alltable[i].style.display = "none";
        }
        document.getElementById("calendarGrid_"+calendarShow).style.display = "block";
        if (calendarShow==1){
            document.getElementById("prevBtn").disabled = true;
        }
    }
}

function callnext(){
    let alltable=document.getElementsByClassName("calendarDiv");
    calendarShow++;
    if (calendarShow<=alltable.length){
        for(let i=0; i < alltable.length; i++) {
            alltable[i].style.display = "none";
        }
        document.getElementById("calendarGrid_"+ calendarShow).style.display = "block";
    }
}

function prevWeek(){
    document.getElementById("semanaNo_"+weekNumber).style.display = "table-row";
    let allWeekArray=document.getElementsByClassName("semanas");
    weekNumber--;
    if (weekNumber<=allWeekArray.length){
        for(let i=0; i < allWeekArray.length; i++) {
            allWeekArray[i].style.display = "none";
        }
        document.getElementById("semanaNo_"+weekNumber).style.display = "table-row";}
}

function nextWeek(){
    let allWeekArray=document.getElementsByClassName("semanas");
    weekNumber++;
    if (weekNumber<=allWeekArray.length){
        for(let i=0; i < allWeekArray.length; i++) {
            allWeekArray[i].style.display = "none";
        }
        document.getElementById("semanaNo_"+weekNumber).style.display = "table-row";}
}

/* function nextWeek(){
    weekNumber++;
    let allWeekArray=document.getElementsByClassName("semanas");
    while (weekNumber<=allWeekArray.length) {
        for(let i=0; i < allWeekArray.length; i++) {
            allWeekArray[i].style.display = "none";}
        document.getElementById("semanaNo_"+ weekNumber).style.display = "table-row";
    } 
} */


content = timeLapse(dateMin, dateMax);

window.onload = (function (){document.getElementById("calendar").innerHTML=content})