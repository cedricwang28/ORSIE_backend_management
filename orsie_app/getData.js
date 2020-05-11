//global variable to hold pop up info
let popUps = [];
//global variable to hold all zone schedules
let masterSchedule = [];
//global variable to hold full schedule html
let fullScheduleHTML;

let url = 'https://orsie.herokuapp.com'

function getData(){
    fetch(`${url}/api/events`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        
        let currentEventsContainer = document.querySelector('#current-events-container');
        let eventData = data;

        for(zone of eventData){
            //add all pop ups to the global pop up array

            for(popup of zone.popup){
                popUps.push({location: zone.location, time: popup.when, msg: popup.what});
            };


            //create schedule cards
            zone.schedule.forEach(evt => {
                if(evt.what != '' && evt.what != 'Zone Open' && evt.what != 'Zone Closed'){
                    //push zone schedule to masterSchedule
                    masterSchedule.push(
                        {html:
                        `<div class="schedule-box">
					        <div class="schedule-time">${evt.when}</div>
					        <div class="schedule-title">${evt.what}</div>
					        <div class="schedule-location">${zone.location}</div>
					        <div class="schedule-zone">${zone.name}</div>
                        </div>`,
                        //convert the time string to a full number for sorting 
                        // time: `${evt.when.replace(/:/, '')}`,
                        location: `${zone.location}`}
                    );
                }
            });

            //create event cards
            currentEventsContainer.innerHTML += `
                <div id="zone${zone.zone}" data-mapId="${zone.mapId}" data-location="${zone.location}" class="event-box">
                    <div class="event-box-inner">
                        <input type='checkbox' class='checkbox zone${zone.zone}'/>
                        <h3 class="event-name">${zone.name}</h3>
                        <p class="event-location">${zone.location}</p>
                        <p class="event-description">${zone.discription}</p>
                        <div class="event-button-wrapper">
                            <h4 class="event-map">Show on Map</h4>
                            <div class="eventDivider">|</div>
                            <h4 class="event-schedule">Timetable</h4>
                        </div>
                    </div>
                </div>
            `;
        }
    })
    .then(data => {
        let fullScheduleContainer = document.querySelector('#full-schedule-container');
        //sort the schedule by time;
        masterSchedule.sort((a,b) => a.time - b.time);
        // create cards for all events in the master schedule
        for(schedule of masterSchedule){
            fullScheduleContainer.innerHTML += schedule.html;
        }
    })
    .then(data => {
        let fullScheduleContainer = document.querySelector('#full-schedule-container');
        //add the default schedule html to the appropriate global variable
        fullScheduleHTML = fullScheduleContainer.innerHTML;

        let guestEmail = localStorage.getItem('orsieEmail')

        fetch(`${url}/api/attend/preload?email=${guestEmail}`).then(data => data.json()).then((data)=>{
            data[0].attend.forEach((item,index)=>{
                document.querySelector(`.zone${item}`).checked = true;
            })
            
        })


        document.querySelectorAll('.checkbox').forEach((v,i) => {

            v.addEventListener('change',function(){
                
                if(this.checked==true){
                    fetch(`${url}/api/attend/add?email=${guestEmail}&zone=${i+1}`).then(data => data.json()).then((data)=>{

                    })
                }
                if(this.checked==false){
                    fetch(`${url}/api/attend/remove?email=${guestEmail}&zone=${i+1}`).then(data => data.json()).then((data)=>{
                        
                    })
                }
            })
        });
    })


    






}