import * as database from "./Database.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
    cors({
        origin: "*", // Replace with your frontend origin
        methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

database.testConnection();

app.get("/history", async (req, res) => {
    try {
        const data = await database.ShowAllHistory()
        if (data && data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(200).json([]);
        }

    } catch (err) {
        console.log("Error fetching data")
    };
});

app.get("/todoStatus", async (req, res) => {
    try {
        const [pendingCount] = await database.GetTaskCountByStatus("pending");
        const [completedCount] = await database.GetTaskCountByStatus("completed");

        res.status(200).json({
            pending: pendingCount.count,
            completed: completedCount.count
        });
    } catch (err) {
        console.error("Error fetching task counts:", err);
        res.status(500).json({ message: "Error fetching task counts.", error: err.message });
    }
});

app.post("/api/timetable", async (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required." });

    try {
        await database.InsertIntoTaskDatabase(task);
        console.log("Task added in the task table.");

        const dataFromTimetable = await database.GetDataFromTimetable(task);
        if (dataFromTimetable) {
            return res.status(200).json({ message: "Task added and retrieved.", dataFromTimetable });
        } else {
            return res.status(404).json({ message: "Task added but not found in the database." });
        }
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({ message: "Error adding task.", error });
    }

});



app.post("/api/todo", async (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required." });

    try {
        await database.InsertIntoToDoDatabase(task, "pending");
        await database.InsertIntoHistorykDatabase(task);

        const getData = await database.GetData(task);
        if (getData) {
            return res.status(200).json({ message: "Task added and retrieved.", getData });
        } else {
            return res.status(404).json({ message: "Task added but not found in the database." });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error adding task.", error: err.message });
    }
});

app.patch("/update/todoEdit", async (req, res) => {
    const { task, status } = req.body;
    if (!task || !status) {
        return res.status(400).json({ message: "Task and status are required." });
    }

    try {
        await database.EditTodoStatus(task, status);
        return res.status(200).json({ message: "Task updated successfully." });
    } catch (err) {
        console.error("Error updating task:", err);
        return res.status(500).json({ message: "Error updating task.", error: err.message });
    }
})

app.delete("/delete/TodoAndHistory", async (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required." });

    try {
        await database.DeleteFromToDo(task);
        await database.DeleteFromHistory(task);
        return res.status(200).json({ message: "Task updated successfully." });
    } catch (err) {
        console.error("Error deleting task:", err);
        return res.status(500).json({ message: "Error deleting task.", error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});