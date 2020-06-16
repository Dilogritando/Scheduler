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
            /* "Siempre que d sea menor al último día de la fecha, agregue una fila" 
            "Cada vez que se agregue una fila, tienen que agregarse columnas hasta llegar a 7" */
            for (k = 0; k < 7; k++){
                displayNum = d < 10 ? "0" + d : d;
                /* "Si el número a mostrar es menor a 10, póngale un 0 antes, de lo contrario déjelo igual" */
                if (d==1){
                   /*  "Si el número a mostrar es el primero del mes entonces..." */
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortD) {  
                    /* "Si al volverlo string el día de la semana coincide con el índice en el que está la iteración de k en el array del cabezote... (ej. si cae en miércoles y en la tabla está en miércoles..." */
                    content += "<td>" + displayNum + "</td>";
                    d++;
                    /* "Entonces agregue la etiqueta de celda con el display que le dije anteriormente, e itere sumando 1 al índice del número a mostrar, de lo contrario..." */
                    } else {
                        content += "<td></td>";
                        /* "De lo contrario la etiqueta deberá estar vacía" */
                    }
                } else if (d>lastDate.getDate()) {
                    /* "Por otro lado, si el valor de d es mayor al último día que permite la fecha, también tiene que quedar vacía la celda" */
                    content += "<td></td>";
                } else {
                    content += "<td>" + displayNum + "</td>";
                    d++;
                    /* "Si no es igual a uno, pero es menor a la última fecha, deberá seguir llenando las celdas" */
                }
            }
            content += "</tr>";
            /* "Ya que se definieron los contenidos de cada fila, etiqueta para cerrar fila" */
        } 
        content+="</tbody>";
        content+="</table>";
    }
    return content;
}
content = timeLapse(dateMin, dateMax);
window.onload = (function (){document.getElementById("calendar").innerHTML=content}) 