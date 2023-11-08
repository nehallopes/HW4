import { v4 as uuidv4 } from "uuid";

import {TodoList} from "./TodoList";
export default function NewTodoItem({ todos = [] }) {
  return (
    <div>
      {todos.map((p, i) => (
        <TodoList {...p} key={uuidv4()} />
      ))}
    </div>
  );
}


