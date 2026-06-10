const API_URL = "https://sms2web.onrender.com/sms";
const REGISTER_URL = "https://sms2web.onrender.com/register";
const ME_URL = "https://sms2web.onrender.com/me";

let currentEmail = "";
let currentPassword = "";
let pollInterval = null;

function getAuthHeader() {
    if (!currentEmail || !currentPassword) return null;
    return "Basic " + btoa(currentEmail + ":" + currentPassword);
}

async function register() {
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;
    
    if (!email || !password) {
        alert("Please enter both email and password to register.");
        return;
    }
    
    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        
        if (response.ok) {
            const text = await response.text();
            alert("Success: " + text);
        } else {
            alert("Registration failed. Status: " + response.status);
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("Error connecting to server.");
    }
}

async function login() {
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;
    
    if (!email || !password) {
        alert("Please enter both email and password to login.");
        return;
    }
    
    // Save credentials in memory
    currentEmail = email;
    currentPassword = password;
    
    // Test the credentials by trying to fetch SMS
    await fetchData();
    // Fetch and display the sync code
    await fetchSyncCode();
    
    // Start Short Polling every 3 seconds
    if (pollInterval) clearInterval(pollInterval);
    pollInterval = setInterval(fetchData, 3000);
}

async function fetchSyncCode() {
    const authHeader = getAuthHeader();
    if (!authHeader) return;
    
    try {
        const response = await fetch(ME_URL, {
            method: 'GET',
            headers: {
                'Authorization': authHeader
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById("syncCodeDisplay").textContent = userData.syncCode;
            document.getElementById("syncCodeContainer").style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching sync code:", error);
    }
}

async function fetchData() {
    const authHeader = getAuthHeader();
    if (!authHeader) {
        // Silently return if not logged in yet
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': authHeader
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert("Invalid email or password!");
            } else {
                alert(`HTTP error! Status: ${response.status}`);
            }
            return;
        }

        const data = await response.json();
        displaySMS(data);
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

async function deleteSms(id) {
    const authHeader = getAuthHeader();
    if (!authHeader) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE',
            headers: {
                'Authorization': authHeader
            }
        });
        
        if (response.ok) {
            console.log('Deleted successfully!');
            fetchData();
        } else {
            alert("Failed to delete. Status: " + response.status);
        }
    } catch (error) {
        console.error("Delete error:", error);
    }
}

function displaySMS(sms){
    const smsList = document.getElementById("sms");
    if(!smsList) return;
    
    smsList.textContent = "";

    sms.forEach((s) => {
        const liElement = document.createElement("li");
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