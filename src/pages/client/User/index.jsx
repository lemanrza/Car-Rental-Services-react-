// import { useEffect, useState } from "react";

// const User = ({ userId }) => {
//   const [rentals, setRentals] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:3000/rentals?userId=${userId}&approved=true`)
//       .then((response) => response.json())
//       .then((data) => setRentals(data));
//   }, [userId]);

//   return (
//     <div className="p-5 h-screen">
//       <h2 className="text-2xl font-semibold mb-4">Rental History</h2>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Car ID</th>
//             <th className="border p-2">Start Date</th>
//             <th className="border p-2">End Date</th>
//             <th className="border p-2">Total Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rentals.map((rental) => (
//             <tr key={rental.id}>
//               <td className="border p-2">{rental.car_Id}</td>
//               <td className="border p-2">{rental.start_Date}</td>
//               <td className="border p-2">{rental.end_Date}</td>
//               <td className="border p-2">£{rental.total_cost}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;
import { useEffect, useState } from "react";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setNewName(data.name);
        setNewEmail(data.email);
        setNewProfileImage(data.profileImage);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:3000/rentals?userId=${userId}&approved=true`)
      .then((response) => response.json())
      .then((data) => setRentals(data));
  }, [userId]);

  const handleUpdateProfile = () => {
    const updatedUser = {
      ...user,
      name: newName,
      email: newEmail,
      profileImage: newProfileImage,
    };

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsEditing(false);
        alert("Profile updated successfully!");
      });
  };

  const handleChangePassword = () => {
    if (oldPassword !== user.password) {
      alert("Incorrect old password!");
      return;
    }

    const updatedUser = {
      ...user,
      password: newPassword,
    };

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
      });
  };

  if (!user) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      <div className="flex items-center mb-4">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isEditing ? (
        <>
          <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Profile Image URL"
            value={newProfileImage}
            onChange={(e) => setNewProfileImage(e.target.value)}
            className="w-full border p-2 rounded-md mb-2"
          />
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Edit Profile
          </button>

          <h3 className="text-xl font-semibold mb-2">Change Password</h3>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 rounded-md mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded-md mb-2"
          />
          <button
            onClick={handleChangePassword}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Change Password
          </button>
        </>
      )}

      <h3 className="text-2xl font-semibold mt-8 mb-4">Rental History</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Car ID</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td className="border p-2">{rental.car_Id}</td>
              <td className="border p-2">{rental.start_Date}</td>
              <td className="border p-2">{rental.end_Date}</td>
              <td className="border p-2">£{rental.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
