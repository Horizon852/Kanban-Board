import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const InviteMember = ({ boardId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInviteClick = () => {
    setIsDialogOpen(true);
    setIsSuccess(false);
  };

  const handleConfirm = () => {
    if (memberName.trim() !== "") {
      setIsSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setMemberName("");
      }, 2000);
    } else {
      alert("Please enter your name before inviting");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setMemberName("");
  };

  return (
    <>
      {/* เปลี่ยนเป็นปุ่ม "+" */}
      <button
        onClick={handleInviteClick}
        className="text-blue-500 ml-2 text-xl"
        title="Invite Member"
      >
        <FaPlus />
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center shadow-lg w-80">
            {!isSuccess ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Invite new members</h2>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Enter member name"
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <h2 className="text-xl font-semibold">Invite {memberName} success!</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InviteMember;
