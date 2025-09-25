import React from "react";
import { Trash2, CheckCircle2 } from "lucide-react"; // icons

interface CompletedTodosProps {
  id: number;
  todo: string;
  dateTime: string;
  deleteTodo: (id: number) => void;
}

const CompletedTodoList = (props: CompletedTodosProps) => {
  // Format date nicely: "Sep 25, 2025"
  const formattedDate = new Date(props.dateTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="mt-4 w-full">
      <div className="flex w-full items-center justify-between gap-8 bg-white p-5 rounded-2xl shadow-md border border-green-300 hover:shadow-lg transition">
      
        <div className="flex items-start gap-3 flex-1">
          <CheckCircle2 className="text-green-500 mt-1" size={22} />
          <div>
            <p className="text-lg font-semibold text-gray-800 line-through">
              {props.todo}
            </p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

       
        <button
          onClick={() => props.deleteTodo(props.id)}
          className="flex  items-center cursor-pointer gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
        >
          <Trash2 size={18} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </li>
  );
};

export default CompletedTodoList;
