import React from "react";

function View({ allData }) {
    const getBackgroundColor = (taskType) => {
        switch (taskType) {
            case "Office":
                return "bg-danger"; 
            case "Personal":
                return "bg-warning";
            case "Family":
                return "bg-success"; 
            case "Friends":
                return "bg-info"; 
            case "Others":
                return "bg-secondary"; 
            default:
                return "bg-light";
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Task List</h2>
            <div className="row">
                {allData.length === 0 ? (
                    <p className="text-center">No tasks available.</p>
                ) : (
                    allData.map((task, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className={`card text-white ${getBackgroundColor(task.TaskType)} shadow`}>
                                <div className="card-body">
                                    <h5 className="card-title">{task.Task}</h5>
                                    {task.Date && <p className="card-text"><strong>Date:</strong> {task.Date}</p>}
                                    <p className={`badge ${task.Status === "Completed" ? "bg-success" : "bg-dark"}`}>
                                        {task.Status === "Completed" ? "✔ Completed" : "⏳ Pending"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default View;
