// Select task input fields and buttons
const taskInputs = document.querySelectorAll(".task_Input");
const addTaskButtons = document.querySelectorAll(".addTaskButton");
const addToToDoButtons = document.querySelectorAll(".addToToDo");

// Prevent default navigation and dynamically load content
function setupNavigation() {
    document.getElementById("toDoLink").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "TODO.html";
    });

    document.getElementById("historyLink").addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "history.html";
    })
}

// Function to handle showing task inputs when "Add Task" button is clicked
function setupAddTaskButtons() {
    addTaskButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const taskInput = taskInputs[index];
            if (taskInput.style.display === "none" || !taskInput.style.display) {
                taskInput.style.display = "block";
            }

            button.style.display = "none";
        });
    });
}

function setupAddToDoButtons() {
    addToToDoButtons.forEach((button, index) => {
        button.addEventListener("click", async () => {
            const taskInput = taskInputs[index];
            const task = taskInput.value.trim();

            if (task) {
                try {
                    const response = await fetch("http://localhost:3000/api/timetable", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ task }),
                    });

                    const data = await response.json();
                    console.log(data);
                    console.log(data.dataFromTimetable[0].task);

                    // Converting the textarea to a div
                    const textDiv = document.createElement("div");
                    textDiv.innerHTML = data.dataFromTimetable[0].task;
                    textDiv.style.width = taskInput.style.width;
                    textDiv.style.maxWidth = taskInput.style.maxWidth;
                    textDiv.style.height = taskInput.style.height;
                    textDiv.style.border = taskInput.style.border;
                    textDiv.style.padding = taskInput.style.padding;
                    textDiv.style.borderRadius = taskInput.style.borderRadius;
                    textDiv.style.fontSize = taskInput.style.fontSize;
                    textDiv.style.boxShadow = taskInput.style.boxShadow;
                    textDiv.style.borderColor = taskInput.style.borderColor;
                    textDiv.style.outline = taskInput.style.outline;

                    // Replacing the textarea with the new div
                    taskInput.parentNode.replaceChild(textDiv, taskInput);

                } catch (error) {
                    console.error("Error sending task to backend:", error);
                }
            } else {
                alert("Task cannot be empty!");
            }
        });
    });
}


// Initialize all functions
function initialize() {
    setupNavigation();
    setupAddTaskButtons();
    setupAddToDoButtons();
}

// Call the initialize function
initialize();