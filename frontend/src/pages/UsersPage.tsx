import React from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
  isActive: boolean;
}

const UsersPage = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.role;
    if (role === "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const activeUsers = response.data.filter((user: UserModel) => user.isActive);
      setUsers(activeUsers);
    } else {
      toast.info("Forbidden Resource");
    }
  };

  React.useEffect(() => {
    if (users.length === 0) getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

        <div className="overflow-hidden rounded-lg shadow border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.firstName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.lastName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-center">
                      {user.role !== "ADMIN" && (
                        <button
                          onClick={async () => {
                            await custom_axios.delete(ApiConstants.USER.DELETE(user.id), {
                              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                            });
                            getAllUsers();
                            toast.success("User Deleted Successfully!");
                          }}
                          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
