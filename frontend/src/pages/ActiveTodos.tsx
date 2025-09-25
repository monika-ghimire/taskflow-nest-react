import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ActiveTodoList from "../components/ActiveTodoList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import { Plus } from "lucide-react";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

function ActiveTodos() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getAllNotCompletedTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if (!userId) {
      toast.info("Sorry you are not authenticated");
      return;
    }
    try {
      const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId), {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setTodos(response.data);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  const saveTodo = async () => {
    if (!title.trim()) {
      toast.info("Please provide a title");
      return;
    }
    const userId = getLoginInfo()?.userId;
    if (!userId) {
      toast.info("Sorry you are not authenticated");
      return;
    }
    try {
      await custom_axios.post(
        ApiConstants.TODO.ADD(userId),
        { title },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success("Todo added successfully!");
      setTitle("");
      setShowModal(false);
      getAllNotCompletedTodos();
    } catch {
      toast.error("Failed to add todo");
    }
  };

  useEffect(() => {
    getAllNotCompletedTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Add Todo Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            Add Todo
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div  className="fixed inset-0 z-50 flex items-center justify-center  transition-opacity duration-300"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fadeIn scale-95 animate-scaleIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">New Todo</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 cursor-pointer rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTodo}
                  className="px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Todos List */}
        <section className="flex flex-col gap-4">
          {todos.map((todo) => (
            <ActiveTodoList
              key={todo.id}
              id={todo.id}
              todo={todo.title}
              dateTime={todo.date}
              deleteTodo={async () => {
                try {
                  await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id), {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                  });
                  toast.success("Todo deleted successfully!");
                  getAllNotCompletedTodos();
                } catch {
                  toast.error("Failed to delete todo");
                }
              }}
              markCompelte={async () => {
                try {
                  await custom_axios.patch(
                    ApiConstants.TODO.MARK_COMPLETE(todo.id),
                    {},
                    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
                  );
                  toast.success("Todo marked as completed");
                  getAllNotCompletedTodos();
                } catch {
                  toast.error("Failed to mark todo complete");
                }
              }}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default ActiveTodos;
