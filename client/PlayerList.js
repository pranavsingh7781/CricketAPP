const API_URL = "http://localhost:8080/api";
const token = localStorage.getItem("token");

const loadplayers = async () => {
    try {
        const response = await fetch(`${API_URL}/players`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const players = await response.json();
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

// Handle logout button
document.getElementById("logoutBtn").addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "Login.html"; // Redirect to login page after logout
});

// Load players when the page loads
window.onload = loadplayers;
