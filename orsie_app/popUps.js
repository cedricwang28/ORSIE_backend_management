//function to clear the news ticker
function clearPopUps(time){
    setTimeout(() => {
        document.querySelector('#newsTicker').innerText = ``;
    }, time);
};

//add the pop up to the news ticker
function displayPopUps(){
    //variable to check if there are new pop ups
    let newPopUps = false;
    //get the date
    let date = new Date();
    //the time in a 24hr string format
    let currentTime = `${date.getHours()}:${date.getMinutes()}`;

    //check each pop up
    popUps.forEach(popup => {
        //if the pop up time matches the current time
        if(popup.time == currentTime){
            newPopUps = true;
            //change the news ticker content to the new pop up 
            document.querySelector('#newsTicker').innerText += ` \xa0\xa0\xa0 | \xa0\xa0\xa0 ${popup.location}: ${popup.msg}`;
        };
    });

    //if there are new pop ups added
    if(newPopUps){
        //clear the pop ups in 4 and a half minutes
        clearPopUps(245000);
    };
};

//run the displayPopUps function every minute
setInterval(displayPopUps, 60000);