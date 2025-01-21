const show = document.getElementById("show");
const historyDiv = document.getElementById("historyDiv");

function setupNavigation() {
    document.getElementById("toDoLink").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "TODO.html";
    });

    document.getElementById("timeTableLink").addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("content").innerHTML = `<h1>Time Table Content Loaded</h1>`;
    });

    document.getElementById("historyLink").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "history.html";
    });
}

// Remove the click behavior on the show  button or prevent it
show.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent any default behavior
    event.stopPropagation(); // Prevent event bubbling
});

function showHistoryButton() {
    show.addEventListener("click", async (event) => {
        console.log("Show history button clicked");
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/history", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error("Failed to fetch data from the server.");
            }

            const data = await response.json();

            // Handle empty data
            if (Array.isArray(data) && data.length > 0) {
                console.log(data);
                historyDiv.style.display = "block";
                showHistory(data); // Display the history data
            } else {
                console.log("No data found");
                historyDiv.style.display = "block";
                historyDiv.innerHTML = "No Data Found :("; // Show "No Data Found"
                historyDiv.style.textAlign = "center";
                historyDiv.style.color = "red";
                historyDiv.style.fontSize = "24px";
                historyDiv.style.fontWeight = "bold";
                historyDiv.style.fontFamily = "Arial, sans-serif";
                historyDiv.style.border = "2px solid red";
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            historyDiv.style.display = "block";
            historyDiv.innerHTML = "An error occurred while fetching data.";
        }
    });
}


function showHistory(data) {
    const historyDiv = document.getElementById("historyDiv");

    // Clear previous content
    historyDiv.innerHTML = "";

    // Ensure the div is displayed
    historyDiv.style.display = "block";
    historyDiv.style.backgroundColor = "#e0e7ef";

    data.forEach((item) => {
        // Create a task container div
        const taskDiv = document.createElement("div");
        taskDiv.style.margin = "10px 0";
        taskDiv.style.padding = "20px";
        taskDiv.style.borderRadius = "8px";
        taskDiv.style.backgroundColor = "#f9f9f9";
        taskDiv.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
        taskDiv.style.display = "flex";
        taskDiv.style.alignItems = "center";
        taskDiv.style.justifyContent = "center";
        taskDiv.style.textAlign = "center";

        // Create a paragraph for the task text
        const taskText = document.createElement("p");
        taskText.textContent = item.task;

        // Apply updated styles to the paragraph
        taskText.style.margin = "0";
        taskText.style.fontSize = "18px"; // Slightly larger font
        taskText.style.fontFamily = "'Poppins', Arial, sans-serif"; // Updated font style
        taskText.style.color = "#333"; // Darker color to avoid camouflage
        taskText.style.fontWeight = "500"; // Medium font weight
        taskText.style.textAlign = "center"; // Center alignment
        taskText.style.textTransform = "uppercase";

        // Append task text to the task container
        taskDiv.appendChild(taskText);

        // Append task container to the history div
        historyDiv.appendChild(taskDiv);
    });
}

setupNavigation();
showHistoryButton();