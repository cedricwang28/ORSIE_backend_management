/**
 * 
 * Everything in this file requires the svg information to function properly
 * 
 * To do:
 * 
 * update map with new colors/specs
 */

//  set object for onload
let object = document.querySelector('#floorMap');

object.onload = function () {
    // setting up map elements
    let map = document.querySelector('#floorMap').contentDocument;

    let activeRooms = [{
            zone: 1,
            roomName: "Global Classroom",
            clickElement: map.querySelector("#gglobalClassroom"),
            animateElement: map.querySelector("#globalClassroom")
        },
        {
            zone: 2,
            roomName: "CFCE 116",
            clickElement: map.querySelector("#gcfce116"),
            animateElement: map.querySelector("#cfce116")
        },
        {
            zone: 3,
            roomName: "CFCE 117",
            clickElement: map.querySelector("#gcfce117"),
            animateElement: map.querySelector("#cfce117")
        },
        {
            zone: 4,
            roomName: "CFCE 118",
            clickElement: map.querySelector("#gcfce118"),
            animateElement: map.querySelector("#cfce118")
        },
        {
            zone: 5,
            roomName: "CFCE 119",
            clickElement: map.querySelector("#gcfce119"),
            animateElement: map.querySelector("#cfce119")
        },
        {
            zone: 6,
            roomName: "CFCE 123",
            clickElement: map.querySelector("#gcfce123"),
            animateElement: map.querySelector("#cfce123")
        },
        {
            zone: 7,
            roomName: "CFCE 123B",
            clickElement: map.querySelector("#gcfce123B"),
            animateElement: map.querySelector("#cfce123B")
        },
        {
            zone: 8,
            roomName: "Atrium",
            clickElement: map.querySelector("#gmrc"),
            animateElement: map.querySelector("#mrc polygon")
        },
        {
            zone: 9,
            roomName: "CFCE/SSB Link",
            clickElement: map.querySelector("#gssbLink"),
            animateElement: map.querySelector("#ssbLink")
        },
        {
            zone: 10,
            roomName: "SSB 116A/B",
            clickElement: map.querySelector("#gssb116"),
            animateElement: map.querySelector("#ssb116")
        }
    ];

    //function for room click results
    function roomClick(eventCard) {
        showEvents();
        //check is user has an ios device
        let isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

        //get meta data for viewport
        viewport = document.querySelector("#viewport");
        original = viewport.attributes.content.value;
        force_scale = original + ", maximum-scale = 1";
        if(isIOS){
            viewport.setAttribute('content', "width=device-width, initial-scale=0");
            //basically same as the closeMap function but with additional hard coded values
            gsap.to(eventsButton, {
                duration: 0.01,
                right: 0,
                opacity: 0,
            });
            // remove the map page from the screen
            gsap.to(mapPage, {
                duration: 0.33,
                // the top here is to position close to the center of where the map tab is
                top: mapTab.offsetTop - window.innerWidth * 0.45,
                right: 4000,
                height: 300,
                borderTopRightRadius: 600,
                borderBottomRightRadius: 600,
                ease: "Power3.Out",
                onComplete: function () {
                    gsap.to(eventsButton, {
                        right: 0,
                        duration: 0.2
                    })
                }
            });
            gsap.to(["#map", "#map-info"], {
                duration: 0.05,
                opacity: 0,
            })
            // map is now closed
            mapOpen = false;
            //event.preventDefault();
            // set fader div to 0.9 alpha black and put fader below other elements
            gsap.to("#fader", {
                duration: 0.5,
                backgroundColor: "rgba(0,0,0,0)",
                ease: "Power3.InOut",
                onComplete: function () {
                    document.getElementById('fader').style.zIndex = -1;
                }
            })
        }else{
            closeMap();
            viewport.setAttribute("content", force_scale);
                    //reset to allow for user zoom
            setTimeout(function () {
                viewport.setAttribute("content", original);
            }, 100);
        }
        //scroll relevant card into view
        eventCard.scrollIntoView();
        //highlight it briefly
        gsap.from(eventCard, {
            duration: 3,
            backgroundColor: "orange",
        })
    };

    // adding click event to all active rooms
    activeRooms.forEach(activeRoom => {
        activeRoom.clickElement.addEventListener("click", function (event) {
                roomClick(document.querySelector(`#zone${activeRoom.zone}`))
        })
    });

    function cardInteraction(){
        let cards = Array.from(document.querySelectorAll(".event-box"));
        
        function cardClick(mapId){
            openMap();
            gsap.from(mapId, {
                duration: 5,
                fill: "orange",
            })
        }
        cards.forEach(card => {
            // add event listener to the show location on map button
            card.querySelector('.event-map').addEventListener("click", function(){cardClick(map.querySelector(`${card.dataset.mapid}`))});
            card.querySelector('.event-schedule').addEventListener("click", function(){showSchedule(card.dataset.location)});
        })
    };

    setTimeout(cardInteraction, 1000);
}