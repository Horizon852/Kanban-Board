import React, { useState } from "react";
import { FaMinus, } from "react-icons/fa"; 


const Task = ({ task, updateTaskName, deleteTask, }) => {
  const [name, setName] = useState(task.name); 
 

  
  const handleChange = (e) => {
    setName(e.target.value);
    updateTaskName(task.id, e.target.value); 
  };

  
  

  return (
    <div className="p-4 border rounded shadow bg-white flex items-center justify-between">
      <input
        type="text"
        value={name}
        onChange={handleChange} 
        placeholder="Write your task..."
        className="w-full p-2 border rounded"
      />
      
     
      <button
        onClick={() => deleteTask(task.id)} 
        className="bg-red-500 text-white p-2 ml-2 rounded hover:bg-red-600"
      >
        <FaMinus />
      </button>

      
    </div>
  );
};

export default Task;
