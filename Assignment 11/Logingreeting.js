const name="Arki";
const currentHour=new Date().getHours();
let greetingMessage;
if(currentHour<12){
    greetingMessage=('Good Morning: ${name}!');
}else if(currentHour<18){
    greetingMessage="Good Afternoon ${name}!";
}else{
    greetingMessage="Good Evening ${name}!";
}console.log(greetingMessage);