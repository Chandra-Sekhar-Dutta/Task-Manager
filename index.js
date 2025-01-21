const Schedule=document.getElementById('Schedule');
const Reminders=document.getElementById('Reminders');
const History=document.getElementById('History');

function Navigate(){
    Schedule.addEventListener('click',()=>{
        window.location.href='Timetable.html';
    });
    Reminders.addEventListener('click',()=>{
        window.location.href='TODO.html';
    });
    History.addEventListener('click',()=>{
        window.location.href='History.html';
    });
}

Navigate();
