# TODO List Application

This is a simple TODO list application that allows users to add, view, update, and delete tasks. The application also provides a feature to analyze the status of tasks using a pie chart.

## Features

- Add new tasks
- View all tasks
- Update task status (Pending/Completed)
- Delete tasks
- Analyze task status with a pie chart

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Charting Library: Chart.js

## Prerequisites

- Node.js and npm installed
- MySQL installed and running

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/todo-list-app.git
    cd todo-list-app
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    - Create a MySQL database named `todolist`.
    - Create the necessary tables (`todo`, `history`) using the following SQL commands:
        ```sql
        CREATE TABLE todo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            status VARCHAR(50) NOT NULL
        );

        CREATE TABLE history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            status VARCHAR(50) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

4. Configure environment variables:
    - Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following:
        ```env
        MY_SQL_HOST=localhost
        MY_SQL_USER=root
        MY_SQL_PASSWORD=yourpassword
        MY_SQL_DATABASE=todolist
        ```

5. Start the backend server:
    ```bash
    node backend.js
    ```

6. Open [index.html](http://_vscodecontentref_/1) in your browser to use the application.


## API Endpoints

### GET /todoStatus
- Description: Get the count of pending and completed tasks.
- Response:
    ```json
    {
        "pending": 5,
        "completed": 10
    }
    ```

### PATCH /update/todoEdit
- Description: Update the status of a task.
- Request Body:
    ```json
    {
        "task": "Task name",
        "status": "Completed"
    }
    ```

### DELETE /delete/TodoAndHistory
- Description: Delete a task from both `todo` and `history` tables.
- Request Body:
    ```json
    {
        "task": "Task name"
    }
    ```

## Usage

1. **Add a Task**: Enter a task in the input field and click the "Add" button.
2. **View Tasks**: All tasks will be displayed in a table.
3. **Update Task Status**: Click the "Complete" button next to a task to mark it as completed.
4. **Delete a Task**: Click the "Delete" button next to a task to remove it.
5. **Analyze Tasks**: Click the "Analyze" button to view a pie chart of pending and completed tasks.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Chart.js](https://www.chartjs.org/) for the charting library
- [Express.js](https://expressjs.com/) for the web framework
- [MySQL](https://www.mysql.com/) for the database



