import React, { useEffect, useState } from "react";
import Task from "../components/Task";

const TasksList = () => {
  const statusOptions = ["Not Started", "In Progress", "Finished"];
  const [taskDesc, setTaskDesc] = useState();
  const [taskStatus, setTaskStatus] = useState("select status");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [tasks, setTasks] = useState([]);
  const tasksPerPage = 6;
  useEffect(() => {
    const SavedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!SavedTasks) return;
    setTasks(SavedTasks);
  }, []);

  const handleEditTask = (taskId, description, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description, status } : task
      )
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === taskId ? { ...task, description, status } : task
        )
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== taskId))
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const lastTaskId = tasks[tasks.length - 1]?.id || 0;
    const newRowTasks = {
      id: lastTaskId + 1,
      description: taskDesc,
      status: taskStatus,
    };

    setTasks((prevTasks) => [...prevTasks, newRowTasks]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newRowTasks]));
  };
  const renderTaskRow = (startIndex) => {
    const filteredTasks = statusFilter
      ? tasks.filter((task) => task.status === statusFilter)
      : tasks;
    const sortedTasks = filteredTasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    const rowTasks = [];
    for (let i = startIndex; i < startIndex + tasksPerPage; i += 2) {
      const firstTask = sortedTasks[i];
      const secondTask = sortedTasks[i + 1];
      rowTasks.push(
        <div
          className="grid lg:grid-cols-2 grid-cols-1 mb-5 px-4 gap-2"
          key={i}
        >
          {firstTask && (
            <Task
              statusOptions={statusOptions}
              key={firstTask.id}
              task={firstTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
          {secondTask && (
            <Task
              statusOptions={statusOptions}
              key={secondTask.id}
              task={secondTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      );
    }

    return rowTasks;
  };
  const totalPages = Math.ceil(
    (statusFilter
      ? tasks.filter((task) => task.status === statusFilter)
      : tasks
    ).length / tasksPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <header className="py-8 px-4 w-full mx-auto">
        <h1 className="text-4xl text-gray mb-4">Tasks List 2024</h1>

        <form className="flex flex-wrap gap-2">
          <input
            className="bg-darker placeholder:text-gray text-light flex-1 p-4 rounded-2xl mb-4 text-xl"
            type="text"
            name="new-task-input"
            value={taskDesc}
            id="new-task-input"
            required
            onChange={(e) => setTaskDesc(e.target.value)}
            placeholder="What do you have planned?"
          />
          <select
            id="new-task-status"
            className="  bg-darker text-light flex-1 p-4 rounded-2xl mb-4 text-xl"
            value={taskStatus}
            required
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="select status" disabled>
              select status
            </option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            disabled={!taskDesc || !taskStatus ? true : false}
            type="submit"
            id="new-task-submit"
            className="text-pink text-xl font-bold 
            bg-gradient-to-r from-pink to-purple 
            bg-clip-text text-transparent cursor-pointer
             transition duration-400 hover:opacity-75 "
            onClick={(e) => handleAddTask(e)}
          >
            Add task
          </button>
        </form>
      </header>
      {tasks.length > 0 && (
        <main>
          {tasks.length > 1 && (
            <div className="flex items-center justify-end gap-3 px-3">
              <select
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                id="sort-by"
                value={statusFilter}
                className="px-3 py-1 text-darkest rounded-full shadow-xl mb-3 bg-gradient-to-r from-pink to-purple "
              >
                <option value="">All Status</option>
                {statusOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-1 text-darkest rounded-full shadow-xl mb-3 bg-gradient-to-r from-pink to-purple "
                onChange={(e) => {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                id="sort-by"
                value={sortOrder}
              >
                <option value="asc">Sort by ID (Ascending)</option>
                <option value="desc">Sort by ID (Descending)</option>
              </select>
            </div>
          )}

          <div id="tasks">
            {renderTaskRow((currentPage - 1) * tasksPerPage)}
          </div>
          {tasks.length >= 6 && (
            <div className="flex items-center gap-3 px-3">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`${currentPage === 1 && "opacity-60"} `}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`${
                    currentPage === index + 1 &&
                    "bg-darkest h-8 w-8 rounded-full text-light"
                  } `}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages && "opacity-60"} `}
              >
                Next
              </button>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default TasksList;
