import { FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateTask } from "../redux/features/todoSlice";

const UpdateTaskBox = ({
  task,
  id,
  isComplted,
}: {
  task;
  //   id: string;
  //   isComplted: unknown;
}) => {
  const [checked, setChecked] = useState(isComplted);
  const [updatedTask, setUpdatedTask] = useState("");
  const dispatch = useAppDispatch();
  console.log(task);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { task: updatedTask || task, id, isCompleted: checked };
    console.log(data);
    // dispatch(updateTask(data));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById("update_task").checked = false;
  };

  return (
    <>
      <input type="checkbox" id="update_task" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form method="dialog">
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
              onChange={(e) => setUpdatedTask(e.target.value)}
              className="input input-bordered w-full max-w-full"
            />
            <label className="cursor-pointer label my-3">
              <span className="label-text text-md font-semibold">
                Task Completed
              </span>
              <input
                type="checkbox"
                checked={checked as boolean}
                onChange={() =>
                  !checked ? setChecked(true) : setChecked(false)
                }
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
      </div>
    </>
  );
};

export default UpdateTaskBox;
