const URL = "https://jsonplaceholder.typicode.com/users";

const teamContainer = document.getElementById("team");
const status = document.getElementById("status");


async function loadTeam() {

    status.textContent = "Loading...";

    try {

        console.log("Fetching data...");

        const response = await fetch(URL);

        console.log("Response received");
        console.log(response);

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const people = await response.json();

        console.log("People received:");
        console.log(people);

        status.textContent = "Team loaded successfully";

        people.forEach(function (person) {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <h2>${person.name}</h2>
                <p><strong>Email:</strong> ${person.email}</p>
                <p><strong>City:</strong> ${person.address.city}</p>
            `;

            teamContainer.appendChild(card);

        });

    } catch (error) {

        console.error("ERROR:", error);

        status.textContent = "Failed to load team: " + error.message;
        status.classList.add("error");

    }
}


loadTeam();