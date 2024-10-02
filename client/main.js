const API_URL = "http://localhost:8080/api";
const token = localStorage.getItem("token");
console.log("Token from localStorage:", token); // Log the token

/*const loadplayers = async () => {
    try {
        const response = await fetch(`${API_URL}/players`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const players = await response.json();
            console.log("Fetched players:", players); // Log the fetched players

            const playerlist = document.getElementById("playerList");
            playerlist.innerHTML = ''; // Clear the existing list

            if (players.length === 0) {
                playerlist.innerHTML = '<li>No players found.</li>';
            } else {
                players.forEach(player => {
                    const li = document.createElement('li');
                    li.innerHTML = ` 
                        <strong>${player.Name}</strong> 
                        - Matches: ${player.Matches}, 
                        Runs: ${player.Runs}, 
                        Wickets: ${player.Wickets} 
                        <img src="${player.Imageurl}" alt="${player.Name}" style="width:50px;height:50px;">
                    `;
                    playerlist.appendChild(li);
                });
            }
        } else {
            const errorData = await response.json(); // Get the response body
            alert('Error occurred: ' + errorData.message); // Show specific error message
            console.error("Failed to load players:", errorData);
        }
    } catch (error) {
        console.error("Error fetching players:", error);
        alert("Error occurred while loading players.");
    }
};
*/

// Handle login form submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Email, Password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.href = "Player.html"; // Redirect to player page
        } else {
            const errorData = await response.json();
            alert("Login Failed! " + errorData.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    }
});

// Registration
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const Username = document.getElementById("username").value;
    const Email = document.getElementById("Email").value;
    const Password = document.getElementById("Password").value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username, Email, Password }),
        });

        if (response.ok) {
            window.location.href = "Login.html"; // Redirect to the login page
        } else {
            const errorData = await response.json();
            alert("Can't Register: " + errorData.message);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
    }
});

// AddPlayer.js (same script you are using for add player form)
document.getElementById("addPlayerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const Name = document.getElementById("name").value;
        const Runs = document.getElementById("runs").value;
        const Matches = document.getElementById("matches").value;
        const Wickets = document.getElementById("wickets").value;
        const Imageurl = document.getElementById("image").files[0];
        const formdata = new FormData();
        formdata.append("Name", Name);
        formdata.append("Matches", Matches);
        formdata.append("Runs", Runs);
        formdata.append("Wickets", Wickets);
        formdata.append("Imageurl", Imageurl);

        const response = await fetch(`${API_URL}/players/new`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formdata,
        });

        if (response.ok) {
            alert('Player has been added successfully');
            window.location.href = "PlayerList.html"; // Redirect to PlayerList page after adding
        } else {
            const errorData = await response.text(); // Read response as text
            console.error("Error response:", errorData);
            alert("Error occurred while adding player: " + errorData);
        }
    } catch (error) {
        console.error("Error occurred while adding player:", error);
    }
});
document.getElementById("seePlayerListBtn").addEventListener("click", () => {
    window.location.href = "PlayerList.html"; // Redirect to the player list page
});

// Logout functionality
document.getElementById("logoutBtn")?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "Login.html";
});



// Logout
document.getElementById("logoutBtn")?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "Login.html";
});

// Load players on page load
window.onload = loadplayers;
