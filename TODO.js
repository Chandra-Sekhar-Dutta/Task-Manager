// Element references
const taskForm = document.getElementById("text_Form");
const taskTableBody = document.getElementById("Task_Body");
const textArea = document.getElementById("task_Input");
const submitButton = document.getElementById("addTaskButton");
const analyzeButton = document.getElementById("analyzeButton");
const chartContainer = document.getElementById("chartContainer");
const ctx = document.getElementById("analysisChart").getContext("2d");


// Prevent default navigation and dynamically load content
document.getElementById("timeTableLink").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "Timetable.html";
});

document.getElementById("historyLink").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "history.html";
})

// Function to style buttons
function styleButton(button, textColor, backgroundColor) {
    button.style.color = textColor;
    button.style.margin = "2px 2px";
    button.style.padding = "5px 10px";
    button.style.width = "auto";
    button.style.borderRadius = "20px";
    button.style.border = `2px solid ${textColor}`;
    button.style.backgroundColor = backgroundColor;
    button.style.cursor = "pointer";
}

// Function to show charts
let analysisChart = null; // Keep a reference to the chart object

function showCharts() {
    analyzeButton.addEventListener("click", async (event) => {
        console.log("Analyze button clicked");
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/todoStatus", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const data = await response.json();

                // Get the pending and completed tasks from the response
                const pending = data.pending;
                const completed = data.completed;

                console.log("Pending-", pending);
                console.log("Completed-", completed);

                // Make sure the chartContainer is visible and styled correctly
                chartContainer.style.display = "block";
                chartContainer.style.width = "50%";
                chartContainer.style.margin = "auto";
                chartContainer.style.padding = "10px";
                chartContainer.style.border = "2px solid black";
                chartContainer.style.borderRadius = "10px";
                chartContainer.style.backgroundColor = "#f0f0f0";
                chartContainer.style.textAlign = "center";

                // If a chart already exists, destroy it before creating a new one
                if (analysisChart) {
                    analysisChart.destroy();
                }

                // Create a new chart with the latest data
                analysisChart = new Chart(ctx, {
                    type: "pie",
                    data: {
                        labels: ["Pending", "Completed"],
                        datasets: [
                            {
                                label: "Task Analysis",
                                data: [pending, completed],
                                backgroundColor: ["#ffcc00", "#00cc00"],
                            },
                        ],
                    },
                });

            } else {
                console.error("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}


// Function to show error message
let errorMessageVisible = false;

function showError() {
    if (!errorMessageVisible) {
        errorMessageVisible = true;
        const errorDiv = document.createElement("div");
        errorDiv.innerHTML = "No task is added";
        errorDiv.style.color = "red";
        errorDiv.style.margin = "10px";
        submitButton.insertAdjacentElement('afterend', errorDiv);

        setTimeout(() => {
            errorDiv.remove();
            errorMessageVisible = false;
        }, 1500);
    }
}

// Function to create a delete button for a table row
function createDeleteButton(cell, row) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    styleButton(deleteButton, "red", "white");

    deleteButton.addEventListener("click", async () => {
        const task = row.cells[0].textContent;

        try {
            const response = await fetch("http://localhost:3000/delete/TodoAndHistory", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task })
            });

            if (response.ok) {
                taskTableBody.deleteRow(row.rowIndex - 1); // Remove the row only if deletion is successful
            } else {
                console.error("Error deleting task");
            }
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    });

    cell.appendChild(deleteButton);
}

function createCompletedButton(cell, row) {
    const completedButton = document.createElement("button");
    completedButton.textContent = "Complete";
    styleButton(completedButton, "green", "white");

    completedButton.addEventListener("click", async () => {
        completedButton.textContent = "Completed";
        completedButton.disabled = true; // Disable button to prevent multiple clicks

        try {
            const task = row.cells[0].textContent;

            // Send PATCH request to update task status
            const response = await fetch("http://localhost:3000/update/todoEdit", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task, status: "Completed" }),
            });

            if (response.ok) {
                console.log("Task updated successfully");
            } else {
                const errorData = await response.json();
                console.error("Error updating task:", errorData.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error making the request:", error);
        }
    });

    cell.appendChild(completedButton);
}

function createPendingButton(cell, row) {
    const pendingButton = document.createElement("button");
    pendingButton.textContent = "Pending";
    styleButton(pendingButton, "red", "white");

    pendingButton.addEventListener("click", async () => {
        // Remove the pending button after it is clicked
        pendingButton.remove();
        // Add a completed button after the task is marked pending
        createCompletedButton(cell, row);
        // Add a delete button after the task is marked completed
        createDeleteButton(cell, row);
    });

    cell.appendChild(pendingButton);
}



// Function to handle task submission
async function handleTaskSubmission(event) {
    event.preventDefault();

    if (textArea.value.trim() === "") {
        showError();
        return;
    }

    const task = textArea.value.trim()
    const response = await fetch('http://localhost:3000/api/todo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify({ task }), // Send task as JSON object
    })

    const data = await response.json()
    console.log(data.getData[0].task)

    const newRow = taskTableBody.insertRow();
    const taskCell = newRow.insertCell(0);

    const actionCell = newRow.insertCell(1);

    taskCell.textContent = data.getData[0].task
    actionCell.style.display = "flex";
    actionCell.style.flexDirection = "row";
    actionCell.style.gap = "10px";

    createPendingButton(actionCell, newRow);
    textArea.value = ""; // Clear the text area

}


// Initialize event listeners
function initializeEventListeners() {
    submitButton.addEventListener("click", handleTaskSubmission);
    showCharts();
}

// Initialize the application
initializeEventListeners();