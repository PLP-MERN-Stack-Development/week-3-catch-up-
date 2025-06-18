import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await getTasks();
        setTasks(res.data);
    };

    const handleAdd = async ()=> {
        const trimmed = text.trim();

        if(!trimmed) return;

        const isDuplicate = tasks.some(task => task.text.toLowerCase() === trimmed.toLowerCase());
        if (isDuplicate){
            alert("Task already exists");
            return;
        }

        const res = await createTask({ text: trimmed, completed: false});
        setTasks((prev) => [...prev, res.data]);
        setText("");
    };

    const handleToggle = async (id) => {
        const task = tasks.find((t) => t._id === id)
        const res = await updateTask(id, { ...task, completed: !task.completed});
        setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t )));
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id ))
    };


    return(
        <div className="min-h-screen bg-gray-100 p-10 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">QuickTasks</h1>
            <div className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Enter new task...."
                />
                <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">
                    Add
                </button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} ontoggle={handleToggle} onDelete={handleDelete} />
                ))}
            </ul>

        </div>
    );

};


export default Home;