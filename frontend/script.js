const API_URL = "https://sms2web.onrender.com//sms";

async function fetchData() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displaySMS(data);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

async function deleteSms(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    // 2. Just read the text (handles empty responses safely)
    const text = await response.text();
    // 3. Log the result
    console.log('Deleted!', text);
    fetchData();
}


function displaySMS(sms){

    const smsList = document.getElementById("sms");
    smsList.textContent = "";

    sms.forEach((s) => {
        const liElement =document.createElement("li");
        liElement.textContent = s.receivedAt + " " + s.sender + " " + s.message;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener('click' , () => {
            deleteSms(s.id);

        })
        liElement.appendChild(deleteButton);
        smsList.appendChild(liElement);
    })
}

fetchData();