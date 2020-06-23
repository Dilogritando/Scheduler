let dateMin = "2020/01/01";
let dateMax = "2021/01/01"; 
let calendarShow = 1; 
let weekNumber= 1;  
let horas = [
    "5am",
    "5:30am",
    "6am",
    "6:30am",
    "7am",
    "7:30am",
    "8am",
    "8:30am",
    "9am",
    "9:30am",
    "10am",
    "10:30am",
    "11am",
    "11:30am",
    "12pm",
    "12:30pm",
    "1pm",
    "1:30pm",
    "2pm",
    "2:30pm",
    "3pm",
    "3:30pm",
    "4pm",
    "4:30pm",
    "5pm",
    "5:30pm",
    "6pm",
    "6:30pm",
    "7pm",
    "7:30pm",
    "8pm",
    "8:30pm",
    "9pm",
    "9:30pm",
    "10pm",
    "10:30pm",
];
let arrito = [];
let sn=1 

function addAppointment(hora,ano,mesNo,diaNo) {
    let ID=`H${hora}A${ano}M${mesNo}D${diaNo}`
    var Answer = window.prompt(`Indica los detalles para tu cita el: ${diaNo}/${mesNo}/${ano} a las ${hora}`, `Nombre del doctor / Estado`);
    window.alert("La info de tu cita: "+ Answer);
    document.getElementById(ID).innerHTML = `<p> Info: ${Answer}</p>`;
}

function officeHours (hora,ano,mesNo,diaNo) {
    return `${hora} <p class=emptySlot id='H${hora}A${ano}M${mesNo}D${diaNo}' onclick="addAppointment('${hora}', ${ano}, ${mesNo}, ${diaNo})"> ... </p>`
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
   /*      content+="<div class='weekBtns'> <button id='prevWeek' onclick='prevWeek()'> < Atrasar semana </button> <button id='nextWeek' onclick='nextWeek()'> Adelantar semana > </button> </div>"; */
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
            sn++;
            content += "<tr class='semanas' id='semanaNo_" + sn + "'>"; 
            for (k = 0; k < 7; k++) {
                displayNum = d < 10 ? "0" + d : d;
                let horasT = horas.map(item => officeHours(item,firstDate.getFullYear(),(i+1),d));
                if (d==1){
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortD) {  
                        content += "<td class='dayCell'>" + "<div class='dayDisplay'>" + displayNum + "</div>" + 
                        "<div class='cellContent'> <div class='scheduler'>" + horasT.join('') +
                        " </div> </div>" + "</td>";
                        d++;
                    } else {
                        content += "<td></td>";
                    }
                } else if (d>lastDate.getDate()) {
                    content += "<td></td>";
                } else {
                    content += "<td class='dayCell'>" + "<div class='dayDisplay'>" + displayNum + "</div>" + "<div class='cellContent'> <div class='scheduler'>" + horasT.join('') + "</div> </div>" + "</td>";
                    d++;
                }
            }
            content += "</tr>";
        }         
        content+="</tbody>";
        content+="</table>";
/*         content+="<div class='weekBtns'> <button id='prevWeek' onclick='prevWeek()'> < Atrasar semana </button> <button id='nextWeek' onclick='nextWeek()'> Adelantar semana > </button> </div>"; */
        content += "</div>";
        
        arrito.push(sn);
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

/* function prevWeek(){
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
} */

content = timeLapse(dateMin, dateMax);
window.onload = (function (){document.getElementById("calendar").innerHTML=content})