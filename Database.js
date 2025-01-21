import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE,
});

// Query and log results
export async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Connected to MySQL successfully!", rows);
    } catch (err) {
        console.error("Error connecting to MySQL:", err);
    }
}

// Function to insert into the "task" table
export async function InsertIntoTaskDatabase(task) {
    try {
        const [insert] = await pool.query("INSERT INTO task (task) VALUES (?)", [task]);
        return insert;
    } catch (err) {
        console.error("Error inserting into database:", err);
        throw err;
    }
}

// Function to insert into the "todo" table
export async function InsertIntoToDoDatabase(task) {
    const status = "pending";
    try {
        const [insert] = await pool.query("INSERT INTO todo (task, status) VALUES (?, ?)", [task, status]);
        return insert;
    } catch (err) {
        console.error("Error inserting into database:", err);
        throw err;
    }
}

// Function to insert into the "history" table
export async function InsertIntoHistorykDatabase(task) {
    try {
        const [insert] = await pool.query("INSERT INTO history (task) VALUES (?)", [task]);
        return insert;
    } catch (err) {
        console.error("Error inserting into database:", err);
        throw err;
    }
}

// Function to return the value of data from the table timetable
export async function GetDataFromTimetable(task) {
    try {
        const [data] = await pool.query("select * from task where task=?", [task])
        if (data.length > 0) {
            console.log(data)
            return data
        } else {
            return null
        }
    } catch (err) {
        console.log("Error fetching data")
        throw err
    }
}

// Function to return the value of data from the table todo
export async function GetData(task) {
    try {
        const [data] = await pool.query("select * from todo where task=?", [task])
        if (data.length > 0) {
            console.log(data)
            return data
        } else {
            return null
        }
    } catch (err) {
        console.log("Error fetching data")
        throw err
    }

}

export async function GetTaskCountByStatus(status) {
    try {
        const [result] = await pool.query("SELECT COUNT(*) as count FROM todo WHERE status = ?", [status]);
        return result;
    } catch (err) {
        console.error("Error fetching task count:", err);
        throw err;
    }
}

export async function EditTodoStatus(task, status) {
    try {
        const [result] = await pool.query("UPDATE todo SET status = ? WHERE task = ?", [status, task]);
        console.log("Updated:", task);
        return result;
    } catch (err) {
        console.error("Error updating database:", err);
        throw err;
    }
}

// show all the values from the table history
export async function ShowAllHistory() {
    try {
        const [data] = await pool.query("select * from history")
        if (data.length > 0) {
            console.log(data)
            return data
        } else {
            return null
        }
    } catch (err) {
        console.log("Error fetching data")
        throw err
    }
}

// Function to delete from the "todo" table
export async function DeleteFromToDo(task) {
    try {
        const [result] = await pool.query("DELETE FROM todo WHERE task = ?", [task]);
        console.log("Deleted:", task);
        return result;
    } catch (err) {
        console.error("Error deleting from database:", err);
        throw err;
    }
}

// function to delete from the "history" table
export async function DeleteFromHistory(task) {
    try {
        const [result] = await pool.query("DELETE FROM history WHERE task = ?", [task]);
        console.log("Deleted:", task);
        return result;
    } catch (err) {
        console.error("Error deleting from database:", err);
        throw err;
    }
}


// Test the functions

// Insert into the "todo" table
// const insertIntoToDo = await InsertIntoToDoDatabase("read", "complete");
// console.log("Inserted into todo:", insertIntoToDo);

// Delete from the "todo" table
// const deleteFromToDo = await DeleteFromToDo("read");
// console.log("Deleted from todo:", deleteFromToDo);

// Insert into the "task" table

// const insertIntoTask = await InsertIntoTaskDatabase("read");
// console.log("Inserted into task:", insertIntoTask);