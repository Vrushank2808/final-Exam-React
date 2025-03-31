import React, { useState, useEffect } from "react";
import View from "./View";

function Form() {
    const [formData, setFormData] = useState({});
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/todo");
                if (!response.ok) throw new Error("Failed to fetch tasks");
                const data = await response.json();
                setAllData(data);
            } catch (error) {
                alert("Error fetching data: " + error.message);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? (checked ? value : "") : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.Task || !formData.Date || !formData.Status || !formData.TaskType) {
            alert("Please fill in all required fields.");
            return;
        }
        if (formData.Task.length < 5) {
            alert("Task description must be at least 5 characters long.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to add task");

            const newTask = await response.json();
            setAllData((prevData) => [...prevData, newTask]); 
            setFormData({});
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">To-Do Form</h1>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Enter User Name"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Task" className="form-label">Task</label>
                    <textarea
                        className="form-control"
                        name="Task"
                        value={formData.Task}
                        onChange={handleChange}
                        placeholder="Enter Task"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="Date"
                        value={formData.Date}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="Status"
                            value="pending"
                            checked={formData.Status === "pending"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Pending</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="Status"
                            value="Completed"
                            checked={formData.Status === "Completed"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Completed</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="TaskType" className="form-label">Task Type</label>
                    <select className="form-select" name="TaskType" value={formData.TaskType} onChange={handleChange}>
                        <option value="">Select Task Type</option>
                        <option value="Personal">Personal</option>
                        <option value="Office">Office</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>

            <View allData={allData} />
        </div>
    );
}

export default Form;
