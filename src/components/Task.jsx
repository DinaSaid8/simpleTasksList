import React, { useState } from "react";

const Task = ({ task, statusOptions, onEdit, onDelete }) => {
  const { id } = task;
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleDelete = () => {
    onDelete(id);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(id,description, status);
    setEditing(false);
  };
  return (
    <div
      className={`bg-darkest rounded-2xl p-4 mb-4 w-full  ${
        !editing && "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3"
      } `}
    >
      {editing ? (
        <form onSubmit={handleSubmit} className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          <select
            className="bg-white px-2 py-1 rounded-md font-bold capitalize inline-block "
            value={status}
            onChange={handleStatusChange}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            className="bg-white px-2 py-1 rounded-md font-bold capitalize inline-block "
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <button
            type="submit"
            className="mx-2 
          uppercase  text-pink text-xl font-bold 
            bg-gradient-to-r from-pink to-purple 
            bg-clip-text text-transparent cursor-pointer
             transition duration-400 hover:opacity-75 "
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <span className={`px-3 py-1 rounded w-fit h-fit text-white ${status.toLowerCase()}`}>{status}</span>
          <p className="text-light break-words">{description}</p>
          <div className="flex items-center justify-end">
            <button
              onClick={handleEdit}
              className="mx-2 
          uppercase  text-pink text-xl font-bold 
            bg-gradient-to-r from-pink to-purple 
            bg-clip-text text-transparent cursor-pointer
             transition duration-400 hover:opacity-75 "
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="delete cursor-pointer mx-2 
            text-xl font-bold  uppercase transition hover:opacity-75 text-[#dc143c]"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Task;
