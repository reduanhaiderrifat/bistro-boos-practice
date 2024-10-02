import React, { useContext, useState } from "react";
import Cart from "../../components/Cart";
import useCart from "../../components/useCart";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllUser from "../../components/AllUser";

const Dashboard = () => {
  const [cart] = useCart();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("default");

  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: () =>
      axiosSecure.get(`/users/${user?.email}`).then((res) => {
        return res.data;
      }),
  });
  const renderContent = () => {
    if (userData?.role === "admin") {
      // Admin-specific content
      switch (activeItem) {
        case "admin1":
          return <p>Admin Dashboard Content</p>;
        case "admin2":
          return <p>Manage Users</p>;
        case "admin3":
          return <AllUser />;
        default:
          return <p>Admin Dashboard Content</p>;
      }
    } else {
      // Non-admin (regular user) content
      switch (activeItem) {
        case "item1":
          return <p>Content for Sidebar Item 1</p>;
        case "item2":
          return <p>Content for Sidebar Item 2</p>;
        case "item3":
          return <Cart />;
        case "item4":
          return <p>Content for Sidebar Item 4</p>;
        case "item5":
          return <p>Content for Sidebar Item 5</p>;
        default:
          return <Cart />;
      }
    }
  };

  console.log(userData?.role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {renderContent()}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Conditionally render the sidebar based on user role */}
          {userData?.role === "admin" ? (
            <>
              <li>
                <a
                  onClick={() => setActiveItem("admin1")}
                  className={activeItem === "admin1" ? "active" : ""}
                >
                  Admin Dashboard
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("admin2")}
                  className={activeItem === "admin2" ? "active" : ""}
                >
                  Manage Users
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("admin3")}
                  className={activeItem === "admin3" ? "active" : ""}
                >
                  All Users
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  onClick={() => setActiveItem("item1")}
                  className={activeItem === "item1" ? "active" : ""}
                >
                  User Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("item2")}
                  className={activeItem === "item2" ? "active" : ""}
                >
                  Reservation
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("item3")}
                  className={activeItem === "item3" ? "active" : ""}
                >
                  My Cart ({cart?.length})
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("item4")}
                  className={activeItem === "item4" ? "active" : ""}
                >
                  Add a Review
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveItem("item5")}
                  className={activeItem === "item5" ? "active" : ""}
                >
                  My Bookings
                </a>
              </li>
            </>
          )}
          {/* The Home link, always visible */}
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
