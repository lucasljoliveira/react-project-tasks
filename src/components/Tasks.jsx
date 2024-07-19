import { useState } from 'react';

export default function Tasks({ tasks, onAdd, onDelete }) {
    const [name, setName] = useState("");

    function handleAddTask(){
        onAdd({name: name});
        setName("");
    }

    function handleChange(event){
        setName(event.target.value);
    }

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            {tasks.lenght === 0 && <p className="text-stone-800 mb-4">This project does not have any tasks yet.</p>}
            <div className="flex items-center gap-4">
                <input type="text" required onChange={handleChange} value={name} className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
                <button type="button" onClick={handleAddTask} className="text-stone-700 hover:text-stone-950">Add Task</button>
            </div>
            <ul>
                {tasks.map(task => {
                    return <li key={task.id} className="flex justify-between my-4">
                        <span>{task.name}</span>
                        <button onClick={() => onDelete(task.id)} className="text-slate-700 hover:text-red-500">Clear</button>
                    </li>
                })}
            </ul>

        </section>
    )
}