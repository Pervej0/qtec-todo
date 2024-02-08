import { useState } from "react";
import { removeTask } from "../redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import UpdateTaskBox from "./UpdateTaskBox";
import { TTask } from "../type/index.type";

const TaskLayout = ({ filter }: { filter: string }) => {
  const [singleTask, setSingleTask] = useState({});
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();
  const filteredData = todos.filter((item) => item.priority === filter);
  const data = filteredData.length ? filteredData : todos;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-20 border-t pt-8">
      {data?.map((item: TTask, index: number) => (
        <div key={index} className="border rounded bg-[#d7d7d7] text-black">
          <div className="border-b border-gray-500 pl-5 font-semibold">
            <h4>{item.date}</h4>
          </div>
          <div className="px-6 py-2">
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl font-semibold">{item?.task}</h1>
                <h5 className="font-semibold">
                  Status:
                  {item.isCompleted ? (
                    <span className="text-green-600"> Completed</span>
                  ) : (
                    <span className="text-yellow-600"> Incomplete</span>
                  )}
                </h5>
              </div>
              <div className="text-">
                {item.priority === "Low" && (
                  <span className="bg-yellow-600 px-2 py-1 text-white rounded">
                    {item.priority}
                  </span>
                )}
                {item.priority === "High" && (
                  <span className="bg-red-600 px-2 py-1 text-white rounded">
                    {item.priority}
                  </span>
                )}
                {item.priority === "Medium" && (
                  <span className="bg-blue-600 px-2 py-1 text-white rounded">
                    {item.priority}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between py-2 items-center">
              <button
                className="btn uppercase btn-sm btn-outline"
                onClick={() => {
                  setSingleTask(() => item);
                  (
                    document.getElementById("update_task") as HTMLDialogElement
                  ).showModal()!;
                }}
              >
                Update
              </button>
              <UpdateTaskBox task={singleTask} />

              <button onClick={() => dispatch(removeTask(item.id))}>
                <img
                  src="https://i.ibb.co/0CdnZFD/1486564399-close-81512.png"
                  alt="1486564399-close-81512"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskLayout;
