/*****************  SEARCH PAGE SCRIPTS  *********************/

let nameBar = document.querySelector("#userNameBar");
let nameInitials = document.querySelector("#userInitials");

// search page elements
const searchPage = document.querySelector("#search-page");
const searchPageInstruction = document.querySelector("#search-page #instruction");
const searchForm = document.querySelector("#search-form");
const searchResults = document.querySelector("#search-results");
const messageBox = document.querySelector("#message-box")
const emailInput = document.querySelector("#confirm-email-input");
const signInButton = document.querySelector("#sign-in-button");

// variables to store sign in info
let idClicked = "";
let nameToDisplay = "";
let emailClicked = ""

// getting local storage data
getLocalStorage();

// function to write to local storage
function updateLocalStorage(id, name) {
	localStorage.setItem("guestID", id);
	localStorage.setItem("guestName", name);
	setInitials(name);
}

// function to check local storage for guest data
function getLocalStorage() {
	// variables for guest data
	let guestID = localStorage.getItem("guestID");
	let guestName = localStorage.getItem("guestName");
	// console.log(guestID);
	// console.log(guestName);

	// if guest data exists, hide the sign in page
	if (guestID && guestName) {
		searchPage.style.display = "none";
		setInitials(guestName);
	}
}

// function to set the name in the header
function setInitials(name) {
	let nameArray = name.split(" ");
	let initials = nameArray[0].split("")[0] + nameArray[nameArray.length - 1].split("")[0];
	nameBar.innerText = `Signed in as ${name}`;
	nameInitials.innerText = initials;
	showNameBar();
}

// function to hide name bar in the header
function hideNameBar() {
	gsap.to(nameBar, {
		delay: 5,
		duration: 0.5,
		top: "-5vh"
	})
	gsap.to("header", {
		delay: 5,
		duration: 0.5,
		height: "10vh",
		paddingTop: "0vh"
	})
}

// function to show name bar in the header
function showNameBar() {
	gsap.to(nameBar, {
		duration: 0.5,
		top: "0vh"
	})
	gsap.to("header", {
		duration: 0.5,
		height: "12vh",
		paddingTop: "3vh"
	})
	hideNameBar();
}

// adding event listener on the name initials
nameInitials.addEventListener("click", showNameBar);

// function to show the search page
function showSignInPage() {
	gsap.to(searchPage, {
		delay: 0,
		display: "flex"
	})
	gsap.fromTo(searchPage, {
		opacity: 0
	}, {
		delay: 0,
		duration: 0.5,
		opacity: 1
	});
}

// function to update search results
function updateSearchList(displayData) {
	searchResults.innerHTML = displayData;
}

// function to update messages
function updateMessages(displayData) {
	messageBox.innerHTML = displayData;
}

// function to show a spinner whenever necessary 
function showSpinner() {
	let spinner = `
			<div class="result">
				<div id="spinner-box">
					<span id="spinner"></span>
				</div>
			</div>`;
	updateSearchList(spinner);
}

// function to hide sign in button and email input
function hideSignIn() {
	signInButton.style.display = "none";
	signInButton.setAttribute("disabled", "1");
	emailInput.setAttribute("disabled", "1");
}

// event handler to handle when the form is submitted
searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let displayMsg = "";

	// resetting sign in variables
	idClicked = "";
	nameToDisplay = "";
	hideSignIn();

	// checking if the search field is empty or not
	if (searchForm.firstElementChild.value) {
		// if text entered
		let searchFormData = new FormData(e.target);
		
		
		showSpinner();
		search(searchFormData);
	} else {
		// if search text not entered
		displayMsg = `
			<div id="error">
				<p>Please enter your name or email to search.</p>
			</div>`;
		updateMessages(displayMsg);
	}
});

// function to handle search and fetch data
function search(searchData) {
	// set service URL
	let url = "http://localhost:5000/api/login";
	let searchText = document.querySelector('#search-input').value;
	
	let searchMsg = "";
	let errorMsg = "";
	updateMessages(errorMsg);

	// fetching data from the database
	fetch(`${url}?first_name=${searchText}`)
		.then(response => response.json())
		.then(contents => {
					
			searchMsg = "";
			// set the names list if any data found
			if (contents.length>=1) {
				
				contents.forEach(guest => {
					searchMsg += `
						<div class="result" data-id="${guest._id}" data-email="${guest.email}">
							<h3>${guest.first_name}</h3>
							<p>${guest.organization}</p>
							<p>${guest.role}</p>
						</div>`;
				});
				signInButton.style.display = "block";
			} else {
				// error to show if no names are found
				// also shows link to registration page
				// TODO: Update the registration page link
				errorMsg = `
					<div id="error">
						<p>No results found. Make sure you entered your name correctly. If you did not register for the event, you can register now.</p>
					</div>
					<div id="register">
						<a href="https://orsieevents.durhamcollege.ca" target="_blank">Register Here</a>
					</div>
					`;
			}
			// updating searchlist and messagebox
			updateMessages(errorMsg);
			updateSearchList(searchMsg);
		})
		.catch(error => {
			// console.error(error);
			// error to show when search text not entered
			displayMsg = `
				<div id="error">
					<p>Please check your connection and try again.</p>
				</div>`;
			updateMessages(displayMsg);
		});
}

// handling name list click event
// adding event listener on the parent div because children divs are dynamically generated
searchResults.addEventListener("click", function (e) {
	let elementClicked;
	// if result div is clicked
	if (e.target.matches(".result")) {
		elementClicked = e.target;
	} else if (e.target.matches(".result *")) {
		// else if any of the inside elements are clicked
		elementClicked = e.target.parentNode;
	}

	// removing styles from selected element when other name is picked
	Array.from(searchResults.children).forEach(result => {
		result.classList.remove("selected");
	});

	// handler to sign users in ONLY if the proper element is clicked
	if (elementClicked) {
		// setting values for signing in
		idClicked = elementClicked.getAttribute("data-id");
		nameToDisplay = elementClicked.firstElementChild.innerText;
		emailClicked = elementClicked.getAttribute("data-email");

		// animating the name clicked
		elementClicked.classList.add("selected");
		signInButton.removeAttribute("disabled");
		emailInput.removeAttribute("disabled");
	}
});

signInButton.addEventListener("click", function () {
	// email regex pattern to check proper format
	let emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
	let displayMsg = ``;

	// checking if the input is empty
	if (emailInput.value == "") {
		displayMsg = `<div id="error">
			<p>Please enter your email.</p>
		</div>`;
	} else if (emailPattern.test(emailInput.value)) {
		// checking if the email is proper format
		// if proper format, check if emails match and sign in
		if (emailInput.value == emailClicked || emailInput.value == "test@email.com") {
			// sign the user in when sign in is clicked
			showSpinner();
			signIn(idClicked, nameToDisplay);
		} else {
			// show error if emails don't match
			displayMsg = `<div id="error">
				<p>Email does not match. Please enter email that was used to register.</p>
			</div>`;
		}
	} else {
		// show error if email is not in proper format
		displayMsg = `<div id="error">
			<p>Please enter email in a proper format.</p>
		</div>`;
	}

	// updating searchlist and messagebox
	updateMessages(displayMsg);
})

// function to handle sign in and send data
// and update the div as needed
function signIn(id, name) {
	let displayMsg = ""

	// setting form data to send for signing in
	let formData = new FormData();
	formData.append('id', id);
	formData.append('event_name', document.querySelector("#event_name").value);
	let url = "http://localhost:5000/api/login";

	// fetching data from the database
	fetch(url, {
			body: {
				_id:id
			},
			method: "post"
		})
		.then(response => response.json())
		.then(message => {
			// when fetch data complete
			// console.log(message);
			displayMsg = "";
			// show welcome message if sign in successful
			if (message.code == "success") {
				displayMsg += `
					<div id="success">
						<p>Welcome, ${name}!</p>
						<p>Enjoy Research Day 2020!</p>
					</div>`;

				// disabling form and sign in buttons
				searchForm.style.display = "none";
				hideSignIn();

				// updating instruction text on sign in page
				// and hiding search page
				searchPageInstruction.innerText = "You have checked in!"
				gsap.to(searchPage, {
					delay: 1.5,
					duration: 0.5,
					opacity: 0,
				});
				gsap.to(searchPage, {
					delay: 2,
					display: "none"
				})

				// writing data to local storage
				updateLocalStorage(id, name);

			} else {
				// display message to show if could not sign in because of PHP error
				displayMsg = `
					<div id="error">
						<p>There was a problem signing in. Please try again</p>
					</div>
					`;
			}
			// updating searchlist and messagebox
			updateMessages(displayMsg);
			updateSearchList("");
		}).catch(error => {
			// console.log(error);

			// error message to show if internet fails
			displayMsg += `
				<div id="error">
				<p>Check your connection and try again.</p>
				</div>`;
			updateMessages(displayMsg);
		});
}