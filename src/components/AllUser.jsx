import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: usersData, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Admin status updated");
        refetch();
      }
    });
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="table-auto w-full">
          {/* Table head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Table rows */}
            {usersData &&
              usersData.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 text-gray-700">{index + 1}</td>
                  <td className="p-3 text-gray-700">{user?.name}</td>
                  <td className="p-3 text-gray-700">{user?.email}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      {user?.role || "user"}
                    </button>
                  </td>
                  <td className="p-3">
                    <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
