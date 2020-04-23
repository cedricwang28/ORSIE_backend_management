// global declarations
let openMap, closeMap;
let mapTab = document.querySelector('#map-tab');
let eventsButton = document.querySelector('#events-button');
let mapPage = document.querySelector('#map-page');
let mapOpen = false;

//wait for everything to load
window.onload = function () {

	//call the get data function in getData.js to populate the current events tab with the events
	getData();

	//add touch interaction
	mapTab.addEventListener("touchmove", touchMove, false, {
		passive: false
	});

	//add touch interaction
	mapTab.addEventListener("touchend", touchEnd, false, {
		passive: false
	})

	//click function to cover people tapping the button
	openMap = function (event) {
		//move the mapTab for continuity of animation
		gsap.to(mapTab, {
			duration: 0.5,
			left: window.innerWidth - 50,
			ease: "Power3.Out",
			onComplete: function () {
				gsap.to(mapTab, {
					duration: 0.1,
					left: -40,
				})
			}
		});
		// fill the screen with the map page
		gsap.to(mapPage, {
			duration: 0.33,
			right: 0,
			top: 0,
			height: window.innerHeight,
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			ease: "Power3.Out",
			onComplete: function () {
				// animate the events tab into the screen
				gsap.fromTo(eventsButton, {
					x: 30,
					duration: 0.2
				}, {
					x: 0,
					duration: 0.2,
					opacity: 1,
				});
				// fade the actual map in
				gsap.to(["#map", "#map-info"], {
					duration: 0.2,
					opacity: 1,
				})
			}
		});
		// map is now open
		mapOpen = true;
		// set fader div to 0.9 alpha black
		gsap.to("#fader", {
			duration: 0.5,
			backgroundColor: "rgba(0,0,0,0.9)",
			ease: "Power3.InOut",
		})
	}
	mapTab.addEventListener("click", openMap, false, {
		passive: false
	})
	
	//click function to close the map
	closeMap = function (event) {
		// remove the eventsButton from the screen and reset it's location
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
			right: window.innerWidth,
			height: window.innerHeight * 0.6,
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
	}
	eventsButton.addEventListener("click", closeMap);
};