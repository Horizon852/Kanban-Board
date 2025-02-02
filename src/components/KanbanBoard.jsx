import React, { useState, useEffect } from "react";
import Task from "./Task";
import InviteMember from "./InviteMember";
import { FaEdit } from "react-icons/fa";
import AddMemberButton from "./AddMemberButton"; 


const RenameModal = ({ isOpen, onClose, onConfirm, currentName }) => {
  const [newName, setNewName] = useState(currentName);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(newName);
    onClose(); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Change Name</h2>
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter new name..."
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const KanbanBoard = () => {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem("boards");
    return savedBoards ? JSON.parse(savedBoards) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [notification, setNotification] = useState(""); // เพิ่มตัวแปรสำหรับข้อความแจ้งเตือน

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const addBoard = () => {
    const newBoard = { id: Date.now(), name: "New Board", columns: [] };
    setBoards([...boards, newBoard]);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const renameBoard = (boardId, newName) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, name: newName } : board
      )
    );
  };

  const addColumn = (boardId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [
                ...(board.columns || []),
                { id: Date.now(), name: "New Column", tasks: [] },
              ],
            }
          : board
      )
    );
  };

  const deleteColumn = (boardId, columnId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.filter((col) => col.id !== columnId),
            }
          : board
      )
    );
  };

  const renameColumn = (boardId, columnId, newName) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId ? { ...col, name: newName } : col
              ),
            }
          : board
      )
    );
  };

  const addTask = (boardId, columnId) => {
    const newTask = { id: Date.now(), name: "New Task", description: "", members: [] };
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? { ...column, tasks: [...column.tasks, newTask] }
                  : column
              ),
            }
          : board
      )
    );
  };

  const deleteTask = (boardId, columnId, taskId) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column
              ),
            }
          : board
      )
    );
  };

  const renameTask = (boardId, columnId, taskId, newName) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId ? { ...task, name: newName } : task
                      ),
                    }
                  : column
              ),
            }
          : board
      )
    );
  };

  const addMemberToTask = (boardId, columnId, taskId, member) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? { ...task, members: [...task.members, member] }
                          : task
                      ),
                    }
                  : column
              ),
            }
          : board
      )
    );
    setNotification(`${member} has been added to the task!`); 
  };

  const openModal = (boardId, columnId = null, taskId = null, currentName) => {
    setCurrentBoardId(boardId);
    setCurrentColumnId(columnId);
    setCurrentTaskId(taskId);
    setIsEditingBoard(columnId === null && taskId === null);
    setIsEditingTask(taskId !== null);
    setCurrentName(currentName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBoardId(null);
    setCurrentColumnId(null);
    setCurrentTaskId(null);
    setCurrentName("");
  };

  const handleNameChange = (newName) => {
    if (isEditingBoard) {
      renameBoard(currentBoardId, newName);
    } else if (isEditingTask) {
      renameTask(currentBoardId, currentColumnId, currentTaskId, newName);
    } else {
      renameColumn(currentBoardId, currentColumnId, newName);
    }
  };

  return (
    <div className="p-4">
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-center flex-1">Kanban Board</h1>
        <button
          onClick={addBoard}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Add Board
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <input
                type="text"
                value={board.name}
                onChange={(e) => renameBoard(board.id, e.target.value)}
                className="text-xl font-semibold mb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => openModal(board.id, null, null, board.name)} // เปิด modal เพื่อแก้ไขชื่อ Board
                className="text-blue-500 ml-2"
              >
                <FaEdit />
              </button>
            </div>
            <button
              onClick={() => deleteBoard(board.id)}
              className="bg-red-500 text-white px-2 py-1 rounded mb-2"
            >
              Delete Board
            </button>
            <button
              onClick={() => addColumn(board.id)}
              className="bg-green-500 text-white px-2 py-1 rounded mb-4"
            >
              Add Column
            </button>
            {board.columns.map((column) => (
              <div key={column.id} className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) =>
                      renameColumn(board.id, column.id, e.target.value)
                    }
                    className="text-lg font-medium mb-2 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                  />
                  <button
                    onClick={() =>
                      openModal(board.id, column.id, null, column.name)
                    } // เปิด modal เพื่อแก้ไขชื่อ Column
                    className="text-blue-500 ml-2"
                  >
                    <FaEdit />
                  </button>
                </div>
                <button
                  onClick={() => deleteColumn(board.id, column.id)}
                  className="bg-red-400 text-white px-2 py-1 rounded mb-2"
                >
                  Delete Column
                </button>
                <button
                  onClick={() => addTask(board.id, column.id)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded mb-4"
                >
                  Add Task
                </button>
                <div>
                  {column.tasks.map((task) => (
                    <div key={task.id}>
                      <Task
                        boardId={board.id}
                        columnId={column.id}
                        task={task}
                        renameTask={(newName) =>
                          renameTask(board.id, column.id, task.id, newName)
                        }
                        deleteTask={(taskId) =>
                          deleteTask(board.id, column.id, taskId)
                        }
                      />
                      <AddMemberButton 
                        boardId={board.id}
                        columnId={column.id}
                        taskId={task.id}
                        addMemberToTask={addMemberToTask}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <InviteMember boardId={board.id} />
          </div>
        ))}
      </div>

      
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded fixed bottom-4 right-4">
          {notification}
        </div>
      )}

      
      <RenameModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleNameChange}
        currentName={currentName}
      />
    </div>
  );
};

export default KanbanBoard;
