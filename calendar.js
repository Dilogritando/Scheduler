let dateMin = "2020/01/01";
let dateMax = "2021/01/01";

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
    }
    console.log(dates);
    let content = "";
    let weekDays = [
        {shortD:"Lun", fullD:"Lunes"}, 
        {shortD:"Mar", fullD:"Martes"}, 
        {shortD:"Mier", fullD:"Miércoles"}, 
        {shortD:"Jue", fullD:"Jueves"}, 
        {shortD:"Vie", fullD:"Viernes"}, 
        {shortD:"Sáb", fullD:"Sábado"}, 
        {shortD:"Dom", fullD:"Domingo"}
    ];
    let lastDate, firstDate;

    for(let i=0; i<dates.length; i++){
        lastDate=dates[i];
        firstDate= new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
        content+="<div id='calendarGrid_"+ (i+1) + "'>";
        content+="<h2>"+ firstDate.toString().split(" ")[1] + "-"+ firstDate.getFullYear() +"</h2>"; 
        content += "</div>";
        content+="<table >";
        content+="<thead >";
        weekDays.map(item=>{
            content+="<th >"+item.fullD+"</th>";
        });
        content+="</thead>";
        content+="<tbody >";
        let d = 1;
        let displayNum, idMonth; 
        while (d <= lastDate.getDate()){
            content += "<tr>"; 
            for (k = 0; k < 7; k++){
                displayNum = d < 10 ? "0" + d : d;
                if (d==1){
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortD) {  
                    content += "<td>" + displayNum + "</td>";
                    d++;
                    } else {
                        content += "<td></td>";
                    }
                } else if (d>lastDate.getDate()) {
                    content += "<td></td>";
                } else {
                    content += "<td>" + displayNum + "</td>";
                    d++;
                }
            }
            content += "</tr>";
        } 
        content+="</tbody>";
        content+="</table>";
    }
    return content;
}
content = timeLapse(dateMin, dateMax);
window.onload = (function (){document.getElementById("calendar").innerHTML=content}) 