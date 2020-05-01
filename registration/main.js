// JavaScript Document

/*
 * Description: Event registration/sign-in form for DC events
 */


window.onload = function () {

    // page elements
    let splashPage = document.querySelector('#splash');
    let formPage = document.querySelector('#registration-page');
    let orsieLogo = document.querySelector('#registration-form-logo');

    // svg elements
    let orsieLogoSVG = orsieLogo.contentDocument;
    let dcClip = orsieLogoSVG.querySelector('#clip-path');
    let orsieClip = orsieLogoSVG.querySelector('#clip-path-2');
    let greenLine = orsieLogoSVG.querySelector('#lineGreen');
    let brownLine = orsieLogoSVG.querySelector('#lineBrown');

    // form elements
    const insertForm = document.querySelector("#registration-form");
    const inputFields = document.querySelectorAll("input");
    const submitButton = document.querySelector("#submit");
    const spinner = document.querySelector("#spinner");
    const registerText = document.querySelector("#register");
    let guestTypeRadio = document.querySelectorAll("input[type=radio]");
    let consentCheck = document.querySelector("#consent_check");

    // position form page logo on start
    let h = (formPage.offsetHeight / 2) - (formPage.offsetHeight / 5.5);

    // If user has scrolled down, resets the scroll to the top
    TweenMax.to("html", 0.5, {
        scrollTo: 0,
        ease: Sine.easeOut
    });

    // animate splash onto screen, then animate form
    TweenMax.to(splashPage, 0.5, {
        delay: 2.5,
        opacity: 0,
        ease: Power1.easeInOut,
        onComplete: function () {
            splashPage.setAttribute("style", "display: none;");
            // function to animate in form Page
            showForm();
        }
    })

    // function to animate the ORSIE logo
    function animateOrsie() {
        let tweenLogo = new TimelineMax();

        tweenLogo.from(dcClip, .55, {
            scaleY: 0,
            ease: Power1.easeOut,
        })
        tweenLogo.from(orsieClip, .75, {
            // delay:0.75,
            scaleX: 0,
            ease: Power2.easeOut,
        })
        // keep animated lines seperate for it to happen at same time after rest of logo is animated
        TweenMax.from(greenLine, .50, {
            delay: 1,
            transformOrigin: "left top",
            scaleX: 0,
            scaleY: 0,
            ease: Ease.easeOut
        })
        TweenMax.from(brownLine, .50, {
            delay: 1,
            transformOrigin: "right top",
            scaleX: 0,
            scaleY: 0,
            ease: Ease.easeOut
        })
    }

    // event handler for the radio buttons to check if the guest option has been selected
    guestTypeRadio.forEach(radio => {
        radio.addEventListener("change", function (e) {
            if (e.target.value == "Guest") {
                // showing the checkbox
                consentCheck.classList.add("visible");
            } else {
                // hiding the checkbox and unchecking it
                consentCheck.classList.remove("visible");
                document.querySelector("#consent").checked = false;
            }
        })
    });
    


    // animate form in and call to animate orsie logo
    function showForm() {
        // change from display none in css to display grid
        TweenMax.to(formPage, 1, {
            opacity: 1
        });
        // position logo
        TweenMax.set(orsieLogo, {
            y: h,
            opacity: 0
        })
        let t1 = new TimelineMax();
        t1.to(orsieLogo, 1.75, {
            opacity: 1,
            transformOrigin: "center top",
            onComplete: animateOrsie()
        })
        t1.to(orsieLogo, 1, {
            y: 0,
            ease: Power2.easeInOut
        })
        t1.staggerFrom("#registration-page .reveal", 0.25, {
            opacity: 0,
            ease: Power4.easeIn
        }, 0.15)
    }

    // the event listener on input fields for automatic scroll
    inputFields.forEach(field => {
        field.addEventListener("focus", function () {
            // preventing the scroll on iphones (makes it really "jumpy")
            if (!(navigator.vendor === "Apple Computer, Inc.")) {
                TweenMax.to("html", 0.2, {
                    scrollTo: "+=60px",
                    ease: Sine.easeOut
                });
            }
        });
    })

    // event handler for the submit button
    submitButton.addEventListener("click", (e) => {
        let checkedRadio = document.querySelector("input[type=radio]:checked");
        let invalidInput = document.querySelectorAll("input:invalid");

        // resetting the style of each input
        TweenMax.staggerTo("input", 0.25, {
            borderBottom: "2px solid #522C1B"
        })

        TweenMax.staggerTo("#type_selector", 0.25, {
            borderBottom: "2px solid transparent"
        })

        TweenMax.to("#formNote", 0.25, {
            color: "#383838"
        });

        // if text inputs are not empty
        if (invalidInput.length == "") {
            return;
        } else {
            // else if text inputs are empty
            e.preventDefault();
            TweenMax.staggerTo(invalidInput, 0.25, {
                borderBottom: "2px solid red"
            })
            TweenMax.to("#formNote", 0.25, {
                color: "red"
            });
        }

        // if radio option is selected
        if (checkedRadio) {
            return;
        } else {
            // if radio button is not selected
            e.preventDefault();
            TweenMax.staggerTo("#type_selector", 0.25, {
                borderBottom: "2px solid red"
            })
            TweenMax.to("#formNote", 0.25, {
                color: "red"
            });
        }
    });

    // event listener to handel the form submit and send data
    insertForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // disable button, hide text, show spinner
        submitButton.setAttribute("disabled", "disabled");
        registerText.style.display = "none";
        spinner.style.display = "block";

        // sending/fetching data from the server
        let url = "http://localhost:5000/api/signup";

        let data = {
            first_name: document.querySelector('.name_first').value.trim().toLowerCase(),
            last_name: document.querySelector('.name_last').value.trim().toLowerCase(),
            email: document.querySelector('.email').value.trim().toLowerCase(),
            organization: document.querySelector('.organization').value.trim().toLowerCase(),
            city: document.querySelector('.city').value.trim().toLowerCase(),
            province: document.querySelector('.province').value.trim().toLowerCase(),
            role: document.querySelector("input[type=radio]:checked").value.trim().toLowerCase()
        }
        
        
        fetch(url, {
                method: "post",
                body: JSON.stringify(data), 
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            })
            .then(response => response.json())
            .then(message => {
                console.log(message);
                
                // code if connection is successful
                if (message.code == "success") {
                    // show success message if data inserted
                    registerText.innerHTML = `Thank you for your registration, ${inputFields[0].value}! <br>See you at the event.`;
                    spinner.style.display = "none";
                    registerText.style.display = "block";

                    // disabling the form
                    document.querySelectorAll("input, label").forEach(input => {
                        TweenMax.to(input, 0.3, {
                            opacity: 0.5
                        });
                        input.setAttribute("disabled", "disabled");
                    });

                } else if (message.code == 'taken') {
                    // show failure message if data insertion fails
                    // change color to red
                    TweenMax.to(submitButton, 0.5, {
                        backgroundColor: "#D33222",
                        onComplete: function () {
                            // spinner.style.display = "none";
                            registerText.innerHTML = `You have already registered for this event.`;
                            spinner.style.display = "none";
                            registerText.style.display = "block";
                        }
                    })
                    // enable button, change text back to register, change color back to green
                    // executed after 3 seconds
                    TweenMax.to(submitButton, 2, {
                        delay: 3,
                        backgroundColor: "#0b8261",
                        onComplete: function () {
                            registerText.innerHTML = `Register`;
                            submitButton.removeAttribute("disabled");
                        }
                    })
                } else if(message.code == 'error'){
                    // show failure message if data insertion fails
                    // change color to red
                    TweenMax.to(submitButton, 0.5, {
                        backgroundColor: "#D33222",
                        onComplete: function () {
                            // spinner.style.display = "none";
                            registerText.innerHTML = `There was a problem. <br>Please try again.`;
                            spinner.style.display = "none";
                            registerText.style.display = "block";
                        }
                    })
                    // enable button, change text back to register, change color back to green
                    // executed after 3 seconds
                    TweenMax.to(submitButton, 2, {
                        delay: 3,
                        backgroundColor: "#0b8261",
                        onComplete: function () {
                            registerText.innerHTML = `Register`;
                            submitButton.removeAttribute("disabled");
                        }
                    })
                }
            })
            .catch(error => {
                // code to execute if internet fails
                // show failure message
                // change color to red
                TweenMax.to(submitButton, 0.5, {
                    backgroundColor: "#D33222",
                    onComplete: function () {
                        // spinner.style.display = "none";
                        registerText.innerHTML = `Please check your connection and try again.`;
                        spinner.style.display = "none";
                        registerText.style.display = "block";
                    }
                })

                // enable button, change text back to register, change color back to green
                // executed after 3 seconds
                TweenMax.to(submitButton, 2, {
                    delay: 3,
                    backgroundColor: "#0b8261",
                    onComplete: function () {
                        registerText.innerHTML = `Register`;
                        submitButton.removeAttribute("disabled");
                    }
                })
            });
    });
}