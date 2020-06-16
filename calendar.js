let dateMin = "2020/01/01";
let dateMax = "2021/01/01";
let temp;
let dates = [];

function settingDays(date, day){
    date = new Date(date);
    date.setDate(day);
    /*     date.setHours(23); */
    return date;
}

function timeLapse(dateMin, dateMax) {
    let stamp1 = new Date(dateMin);
    let stamp2 = new Date(dateMax);
    date1 = settingDays(dateMin,31);
    date2 = settingDays(dateMax,31);
    /* Hasta aquí he convetido un string en una fecha, y lo preparo para averiguar cuántos días tiene ese mes 
    console.log(date1, stamp2); */
    while (date1 <= date2)
    /* "Siempre que la primera fecha sea menor que la segunda" */
    {
        if (date1.getDate() != 31) 
        /* "Si el último día del mes de la fecha 1 no coincide con 31" */
        {
            temp = settingDays(date1, 0);
            /* "Corre la función para contar días, pero esta vez dame el último día del mes anterior, y guarda la respuesta en una variable temporal llamada temp" */
            if (temp >= stamp1 && temp <= stamp2) 
            /* "Si la fecha guardada es mayor o igual a la primera fecha y menos que la segunda fecha" */
            dates.push(temp);
            /* "Incluya la fecha en el array 'dates'" */
            date1 = settingDays(date1, 31);
            /* HEEEEELLLLPPP */
        } else {
            /* "Si el último día del mes sí es 31..." */
            temp = new Date(date1);
            /* "La fecha se guardará en temp" */
            if (temp >= stamp1 && temp <= stamp2) 
            /* "Si la fecha guardada es mayor o igual a la primera fecha y menos que la segunda fecha" */
            dates.push(temp);
            /* "Incluya la fecha en el array 'dates'" */
            date1.setMonth(date1.getMonth() + 1);
            /* "Y al índicador del mes, súmele uno, para crear un nuevo date1 con el nuevo valor (se empieza a iterar hasta que se cumpla la condición" */
/* Hasta aquí puedo ya ver en consola un array con los últimos días del mes de cada uno de los 12 meses. 
            console.log(dates); */
        }
    }
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
    /* "Para un índice que empezará en 0, si el i es menor al largo del array 'dates', i incrementará hasta que se cumpla la condición" */
    for(let i=0; i<dates.length; i++){
        lastDate=dates[i];
        /* "lastDate va a ser la fecha que ya nos aparecía en el array" */
        firstDate= new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
        /* "firstDate va a ser un nuevo formato de fecha, que tome como referencia el mismo índice del array, en la misma posición que lastDate pero con la fecha 1" */
        content+="<div id='calendarGrid_"+ (i+1) + "'>";
        /* "Esto nos va a dar un div para meter el título del mes/año, con un id que nos permita identificar el mes" */
        content+="<h2>"+ firstDate.toString().split(" ")[1] + "-"+ firstDate.getFullYear() +"</h2>";
        /* "Esta línea nos permite extraer el mes del array de fechas y ponerlo en formato h2" */ 
        content += "</div>";
        content+="<table >";
        /* "Aquí creamos una cuadrícula donde cada uno de los encabezados son los weekdays que asignamos" */
        content+="<thead >";
        weekDays.map(item=>{
            content+="<th >"+item.fullD+"</th>";
        });
        content+="</thead>";
        /* "Hasta aquí tenemos el header y los nombres de cada día de la semana, y a continuación dibujamos el cuerpo de la cuadrícula para los números" */
        content+="<tbody >";
        let d = 1;
        /* "Estos serán los días" */
        let displayNum, idMonth; 
        while (d <= lastDate.getDate()){
            content += "<tr>"; 
            /* "Siempre que d sea menor al último día de la fecha, agregue una fila" 
            "Cada vez que se agregue una fila, tienen que agregarse columnas hasta llegar a 7" */
            for (let k = 0; k < 7; k++){
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
                    }} 
                else if (d>lastDate.getDate()) {
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
        content+="</table>";
        content+="</tbody>";
        content+="</div>"; 
        return content;
    }
}

content = timeLapse(dateMin, dateMax);
window.onload = (function (){document.getElementById("calendar").innerHTML=content}) 