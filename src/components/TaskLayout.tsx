/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { removeTask } from "../redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UpdateTaskBox from "./UpdateTaskBox";

const TaskLayout = () => {
  const [singleTask, setSingleTask] = useState({});
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();
  // const data = !reduxData?.length ? todosData : reduxData;
  // console.log(data, "ere");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-20 border-t pt-8">
      {todos?.map((item: any, index: number) => (
        <div key={index} className="border rounded bg-[#d7d7d7] text-black">
          <div className="border-b border-gray-500 pl-5 font-semibold">
            <h4>{item.date}</h4>
          </div>
          <div className="px-6 py-2">
            <h1 className="text-2xl">{item?.task}</h1>
            <h5 className="font-semibold">
              Status:
              {item.isCompleted ? (
                <span className="text-green-600"> Completed</span>
              ) : (
                <span className="text-yellow-600"> Incomplete</span>
              )}
            </h5>
            <div className="flex justify-between py-2 items-center">
              <button
                className="btn uppercase"
                onClick={() => {
                  setSingleTask(() => item);
                  document.getElementById("update_task").showModal();
                }}
              >
                Update
              </button>
              <UpdateTaskBox task={singleTask} />
              <button
                onClick={() => dispatch(removeTask(item.id))}
                className="fw-semibold uppercase py-2 px-2 text-white border border-red-600 bg-red-600 hover:border-black rounded transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskLayout;
