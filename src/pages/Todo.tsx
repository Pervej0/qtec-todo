import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskLayout from "../components/TaskLayout";

const Todo = () => {
  const [filter, setFilter] = useState("Filter by");
  return (
    <section>
      <TaskForm filter={filter} setFilter={setFilter} />
      <TaskLayout filter={filter} />
    </section>
  );
};

export default Todo;
