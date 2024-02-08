import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTask } from "../redux/features/todoSlice";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  // const data = !todos?.length ? todosData : todos;
  const totalTodo = todos?.length || 0;
  const completedTodo = todos?.filter((item) => item?.isCompleted)?.length || 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const generateId = Math.random().toString(36).substring(2, 10);
    const date = new Date().toLocaleDateString();
    const data = {
      id: generateId,
      task,
      isCompleted: false,
      date,
    };
    dispatch(addTask(data));
    setTask("");
  };

  return (
    <div className="w-full flex sm:flex-col md:flex-row gap-5 justify-between text-center px-2 sm:px-16">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center md:w-2/3 w-full"
      >
        <input
          className="block h-14 w-full rounded-s-md text-lg pl-3 bg-transparent text-white border"
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Write task"
          required
        />
        <button className="block bg-white rounded-e-md h-14 w-28 border-l-2 font-semibold text-lg hover:bg-[#2a3240] hover:text-white hover:border">
          Add Task
        </button>
      </form>
      <div className="w-1/3 text-white h-full border-l py-10">
        <div className="text-right pr-6 pt-4 mx-4">
          <h6 className="bg-gray-400 px-3 text-black border-b text-lg py-1">
            Total Tasks: {totalTodo}
          </h6>
          <h6 className="bg-green-600 px-3 text-black text-lg py-1">
            Completed Tasks: {completedTodo}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
