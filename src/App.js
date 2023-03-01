import './App.css';
import {useState} from "react";
import React from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setTitleError(false);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setDescriptionError(false);
    };

    const handleTaskCreate = (e) => {
        e.preventDefault();
        if (!title) {
            setTitleError(true);
            return;
        }
        if (!description) {
            setDescriptionError(true);
            return;
        }
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
    };

    const handleTaskStatusChange = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task, completed: !task.completed,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleTaskSelect = (taskId) => {
        const task = tasks.find((task) => task.id === taskId);
        setSelectedTask(task);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (selectedTask) {
            const updatedTasks = tasks.map((task) => {
                if (task.id === selectedTask.id) {
                    return {
                        ...task, completed: selectedTask.completed,
                    };
                }
                return task;
            });
            setTasks(updatedTasks);
        }
        setSelectedTask(null);
    };

    return (
        <div>
            <div className="form">
                <div>
                    <label htmlFor="title-input">Title:</label>
                    <input type="text" id="title-input" value={title} onChange={handleTitleChange}/>
                    {titleError && <span style={{color: 'red'}}>This field is empty</span>}

                    <label htmlFor="description-input">Description:</label>
                    <input type="text" id="description-input" value={description} onChange={handleDescriptionChange}/>
                    {descriptionError && <span style={{color: 'red'}}>This field is empty</span>}
                </div>
                <button onClick={handleTaskCreate}>Create</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}  onClick={() => handleTaskSelect(task.id)}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            <input type="checkbox"
                                   checked={task.completed}
                                   onChange={() => handleTaskStatusChange(task.id)}
                                   disabled
                            />
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '5px', width: '450px' }}>
                        <div>
                            <h2>{selectedTask.title}</h2>
                            <p>Description:</p>
                            <p>{selectedTask.description}</p>
                            <label>Status:</label>
                            <input type="checkbox" checked={selectedTask.completed} onChange={() => setSelectedTask({...selectedTask, completed: !selectedTask.completed})} />
                        </div>
                       <button onClick={handleModalClose} style={{marginTop: '30px'}}>Close</button>
                    </div>
                </div>
            )}

        </div>
    )

}

export default App;
