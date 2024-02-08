import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTask } from "../redux/features/todoSlice";
import toast from "react-hot-toast";

const TaskForm = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Task Priority");
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  const totalTodo = todos?.length || 0;
  const completedTodo = todos?.filter((item) => item?.isCompleted)?.length || 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const generateId = Math.random().toString(36).substring(2, 10);
    const date = new Date().toLocaleDateString();
    const data = {
      id: generateId,
      task,
      priority: priority,
      isCompleted: false,
      date,
    };
    console.log(data, "rere");
    dispatch(addTask(data));
    setTask("");
    toast.success("Task Added");
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-5 justify-between text-center px-2 sm:px-16 sm:py-0 items-center">
      <form
        onSubmit={handleSubmit}
        className=" items-center md:w-2/3 w-full pt-10"
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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          className="select select-bordered w-full mt-3 font-semibold"
        >
          <option className="font-semibold" disabled selected>
            Task Priority
          </option>
          <option>High</option>
          <option>Low</option>
          <option>Medium</option>
        </select>
        <button className="block mt-5 bg-white rounded h-14 w-28 font-semibold text-lg hover:bg-[#2a3240] hover:text-white hover:border mb-5">
          Add Task
        </button>
      </form>
      <div className="w-full md:w-1/3 h-full bottom-0 sm:border-l sm:py-10 pt-0">
        <div className="text-right md:pr-6 pr-0 pt-4 mx-4">
          <h6 className="bg-gray-400 px-3 text-black text-lg py-1">
            Total Tasks: {totalTodo}
          </h6>
          <h6 className="bg-green-600 px-3 text-black text-lg py-1">
            Completed Tasks: {completedTodo}
          </h6>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            required
            className="select select-bordered mt-10 font-semibold mb-5 md:mb-0"
          >
            <option className="font-semibold" disabled selected>
              {filter}
            </option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
