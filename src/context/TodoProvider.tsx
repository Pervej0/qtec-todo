import { ReactNode, createContext, useState } from "react";

type TSetFavouriteBlog = React.Dispatch<React.SetStateAction<number>>;
type TTodoReport = { totalTodo: number; completedTodo: number };

export const TodoContext = createContext({});

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoReport, setTodoReport] = useState({});
  return (
    <TodoContext.Provider value={{ todoReport, setTodoReport }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
