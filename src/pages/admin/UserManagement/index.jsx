import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.isBanned === "true" && user.ban > 0) {
            const updatedBan = user.ban - 1;
            const updatedUser = {
              ...user,
              ban: updatedBan,
              isBanned: updatedBan > 0 ? "true" : "false",
            };

            if (updatedBan === 0) {
              fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
              }).catch((err) => console.error("Error updating user:", err));
            }

            return updatedUser;
          }
          return user;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBan = (user) => {
    Swal.fire({
      title: `Ban ${user.name}`,
      input: "number",
      inputLabel: "Ban duration (hour)",
      inputPlaceholder: "Enter hours",
      showCancelButton: true,
      confirmButtonText: "Ban",
      cancelButtonText: "Cancel",
      preConfirm: (hours) => {
        if (!hours || hours <= 0) {
          Swal.showValidationMessage("Enter valid numbers of hours");
        }
        return hours * 3600; 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = { ...user, isBanned: "true", ban: result.value };

        fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then(() => {
            setUsers((prev) =>
              prev.map((u) => (u.id === user.id ? updatedUser : u))
            );
            Swal.fire(
              "Success!",
              `${user.name} ban for ${result.value / 3600} hours.`,
              "success"
            );
          })
          .catch((err) => console.error("Ban error:", err));
      }
    });
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 h-screen ml-64 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-24 h-24 rounded-full mb-3"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.isBanned === "true" ? (
              <p className="text-red-500 mt-2">
              Banned for {formatTime(user.ban)} hours
              </p>
            ) : (
              <button
                onClick={() => handleBan(user)}
                className="mt-3 py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Ban User
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
