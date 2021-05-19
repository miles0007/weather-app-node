

console.log("My client side javascript")


const weatherPage = document.getElementById("weatherPage");

if (weatherPage) {
    formFunctionality()  
}

function formFunctionality() {
    const form = document.getElementById("form");
    const place = document.getElementById('address');
    const messageOne = document.getElementById('message-One');
    const messageTwo = document.getElementById('message-Two');
    form.addEventListener('submit', function(e) {
        messageTwo.textContent = ''
        e.preventDefault()
        if (place.value <= 0) {
            messageOne.textContent = "Must enter address to submit the form."
        } else {
            messageOne.textContent = 'Loading..'
            fetch('http://localhost:8000/weather?address='+place.value).then(response => {
                response.json().then(data => {
                    if (data.err) {
                        messageOne.textContent = data.err;
                    } else {
                        messageOne.textContent = data.response.reportData;
                        messageTwo.textContent = data.response.detailedData;
                    }
                });
            });
        }
    });
}