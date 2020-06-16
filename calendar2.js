/* timeLapse(date1, date2){
    console.log(`La primera fecha es el día ${date1.day} del mes ${date1.getMonth} del año ${date1.getFullYear} y la segunda fecha es el día ${date2.day} del mes ${date2.getMonth} del año ${date2.getFullYear}`);
} */

var date1 = new Date();
date1.setFullYear(2020, 0, 31);

var date2 = new Date();
date2.setFullYear(2022, 0, 31);

console.log (`La primera fecha es el día ${date1.day} del mes ${date1.getMonth} del año ${date1.getFullYear} y la segunda fecha es el día ${date2.day} del mes ${date2.getMonth} del año ${getFullYear(date2)}`)

let content = timeLapse(date1, date2);
document.getElementById("calendar").innerHTML = content;