/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateTask } from "../redux/features/todoSlice";

const UpdateTaskBox = ({ task }: { task: any }) => {
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState(task.priority);
  const [updatedTask, setUpdatedTask] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { ...task };
    data.task = updatedTask || data.task;
    data.isCompleted = checked || data.isCompleted;
    data.priority = priority || data.priority;
    dispatch(updateTask(data));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document?.getElementById("update_task")?.close();
  };

  const handleToggle = (id: string) => {
    if (task.id === id) {
      !checked ? setChecked(true) : setChecked(false);
    }
  };

  return (
    <>
      <dialog id="update_task" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-lg font-bold mb-3">Update Task</h2>
          <form onSubmit={handleSubmit} className="form-control pb-2">
            <input
              type="text"
              placeholder="Task.."
              defaultValue={task.task}
              key={task.task}
              onChange={(e) => setUpdatedTask(e.target.value)}
              className="input input-bordered w-full max-w-full"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="select select-bordered w-full mt-3 font-semibold"
            >
              <option className="font-semibold" disabled selected>
                Task Priority
              </option>
              <option>High</option>
              <option>Low</option>
              <option>Medium</option>
            </select>
            <label className="cursor-pointer label my-3">
              <span className="label-text text-md font-semibold">
                Task Completed
              </span>
              <input
                type="checkbox"
                checked={checked as boolean}
                name="completeTask"
                onChange={() => handleToggle(task.id)}
                className="checkbox checkbox-success"
              />
            </label>
            <button
              type="submit"
              className="border font-bold uppercase py-2 rounded bg-black text-white"
            >
              Update
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="update_task">
          Close
        </label>
      </dialog>
    </>
  );
};

export default UpdateTaskBox;
