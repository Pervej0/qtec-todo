import { useContext, useEffect, useState } from "react";
import { removeTask } from "../redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UpdateTaskBox from "./UpdateTaskBox";
import { TodoContext } from "../context/todoProvider";

const TaskLayout = () => {
  const [singleTask, setSingleTask] = useState({});
  const todoData = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();
  const { setTodoReport } = useContext(TodoContext);

  useEffect(() => {
    const totalTodo = todoData.length;
    const completedTodo = todoData.filter((item) => item.isCompleted).length;

    if (totalTodo && completedTodo) {
      setTodoReport({ totalTodo, completedTodo });
    }
  }, [todoData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-20 border-t pt-10">
      {todoData?.map((item, index) => (
        <div
          key={index}
          className="border rounded bg-[#d7d7d7] text-black px-6 py-2"
        >
          <h1 className="text-2xl">{item?.task}</h1>
          <h5 className="font-semibold">
            Status:
            {item.isCompleted ? (
              <span className="text-green-600"> Completed</span>
            ) : (
              <span className="text-yellow-600"> Incomplete</span>
            )}
          </h5>
          <h5>
            <span className="font-semibold">Date:</span> {item.date}
          </h5>

          <div className="flex justify-between py-2 items-center">
            <label
              onClick={() => setSingleTask(item)}
              htmlFor="update_task"
              className="btn uppercase"
            >
              Update
            </label>
            <UpdateTaskBox task={singleTask} />
            <button
              onClick={() => dispatch(removeTask(item.id))}
              className="fw-semibold uppercase py-2 px-2 text-white border border-red-600 bg-red-600 hover:border-black rounded transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskLayout;
