import React, { useState } from "react";
import { toast } from "react-toastify"; 

const AddMemberButton = ({ boardId, columnId, taskId, addMemberToTask }) => {
  const [newMember, setNewMember] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleAddMember = () => {
    console.log("เพิ่มสมาชิก:", newMember); 
    if (newMember.trim()) {
      addMemberToTask(boardId, columnId, taskId, newMember); 
      setNewMember(""); 
      setIsModalOpen(false); 
      toast.success(`Add member: ${newMember} Finish!`); 
    } else {
      toast.error("Please enter the correct member name"); 
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      
      <button
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-500 text-white px-2 py-1 rounded"
        title="Add Member" 
      >
        Add member
      </button>

     
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Add Member</h2>
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter member name"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)} 
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember} 
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberButton;
