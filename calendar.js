let dateMin = "2020/01/01";
let dateMax = "2021/01/01";
let calendarShow = 1; 
let semana = 1;


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
        content+="<table class='calendarTable'>";
        content+="<thead >";
        weekDays.map(item=>{
            content+="<th >"+item.fullD+"</th>";
        });
        content+="</thead>";
        content+="<tbody >";
        let d = 1;
        let displayNum; 
        while (d <= lastDate.getDate() ) {
            content += "<tr class='semanas' id='semanaNo_" + (+1) + "'>"; 
            for (k = 0; k < 7; k++) {
                displayNum = d < 10 ? "0" + d : d;
                if (d==1){
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortD) {  
                        content += "<td id='dayCell'>" + "<div id='dayDisplay'>" + displayNum + "</div>" + "<div id='cellContent'></div>" + "</td>";
                        d++;
                    } else {
                        content += "<td></td>";
                    }
                } else if (d>lastDate.getDate()) {
                    content += "<td></td>";
                } else {
                    content += "<td id='dayCell'>" + "<div id='dayDisplay'>" + displayNum + "</div>" + "<div id='cellContent'></div>" + "</td>";
                    d++;
                }
            }
            content += "</tr>";
        } 
        content+="</tbody>";
        content+="</table>";
        content += "</div>";
    }
    content+="<div class='weekBtns'><button id='prevWeek' onclick='prevWeek()'> < Atrasar semana </button> <button id='nextWeek' onclick='nextWeek()'> Adelantar semana > </button> </div>";
    return content;
} /* este cierra el function timelapse */

function callprev(){
    let alltable=document.getElementsByClassName("calendarDiv");
    document.getElementById("nextBtn").disabled = false;
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
    document.getElementById("prevBtn").disabled = false;
    calendarShow++;
    if (calendarShow<=alltable.length){
        for(let i=0; i < alltable.length; i++) {
            alltable[i].style.display = "none";
        }
        document.getElementById("calendarGrid_"+ calendarShow).style.display = "block";
        if (calendarShow==alltable.length){
            document.getElementById("nextBtn").disabled = true;
        }
    }
}
{/* Funciones de botones de abajo function prevWeek(){
    let allWeek=document.getElementsByClassName("semanas");
    semanas--;
    if (semanas>=1){
        for(let i=0; i < allWeek.length; i++) {
            allWeek[i].style.display = "none";
        }
        document.getElementById("calendarGrid_"+calendarShow).style.display = "block";
        if (semanas==1){
            document.getElementById('prevWeek').disabled = true;
        }
    }
}

function nextWeek(){
    let allweek=document.getElementsByClassName("calendarDiv");
    document.getElementById('prevBtn').disabled = false;
    calendarShow++;
    if (calendarShow<=alltable.length){
        for(let i=0; i <alltable.length; i++) {
            alltable[i].style.display = "none";
        }
        document.getElementById("calendarGrid_"+calendarShow).style.display = "block";
        if (calendarShow==alltable.length){
            document.getElementById('nextBtn').disabled = true;
        }
    }
}
 */
}

content = timeLapse(dateMin, dateMax);

window.onload = (function (){document.getElementById("calendar").innerHTML=content})