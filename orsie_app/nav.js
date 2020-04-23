//events nav element
let eventsNav = document.querySelector('#eventsNav');
//schedule nav element
let scheduleNav = document.querySelector('#scheduleNav');

//function to show event page from schedule page
function showEvents(){
    //remove highlight from schedule
    scheduleNav.classList.remove('highlight');
    //add highlight class
    eventsNav.classList.add('highlight');

    //reset the schedule back to the default
    resetSchedule();
    // update to animate or whatever
    document.querySelector('#current-events-container').style.display = "block";
    document.querySelector('#full-schedule-container').style.display = "none";
};

//function to show schedule page from event page 
function showSchedule(location){
    //remove highlight from schedule
    eventsNav.classList.remove('highlight');
    //add highlight class if it does not already have it
    scheduleNav.classList.add('highlight');

    location ? scheduleSorter(location) : resetSchedule();
    // update to animate or whatever
    document.querySelector('#current-events-container').style.display = "none";
    document.querySelector('#full-schedule-container').style.display = "block";
};

document.querySelector('#eventsNav').addEventListener('click', (e) => {
    showEvents();
});

document.querySelector('#scheduleNav').addEventListener('click', (e) => {
    showSchedule();
});