import React from "react";
import { CheckCircle, Trash2 } from "lucide-react"; // icons

interface ActiveTodoListProps {
  id: number;
  todo: string;
  dateTime: string;
  markCompelte: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ActiveTodoList = (props: ActiveTodoListProps) => {
  // Format the date
  const formattedDate = new Date(props.dateTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="mt-6">
      <div className="bg-white flex flex-1 gap-8 items-center justify-between p-6 rounded-2xl shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
        {/* Todo text + date */}
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-gray-800">{props.todo}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>

        {/* Buttons with spacing */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => props.markCompelte(props.id)}
            className="flex cursor-pointer hover:-mt-2 items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-sm transition"
          >
            <CheckCircle size={18} />
          
          </button>

          <button
            onClick={() => props.deleteTodo(props.id)}
            className="flex  cursor-pointer hover:-mt-2 items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-sm transition"
          >
            <Trash2 size={18} />
           
          </button>
        </div>
      </div>
    </li>
  );
};

export default ActiveTodoList;
