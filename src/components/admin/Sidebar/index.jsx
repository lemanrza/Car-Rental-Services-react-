import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Car, Users, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-8">Rental Car Admin</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to={""} className="flex items-center gap-2">
            <Home />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to={"rentalManagement"} className="flex items-center gap-2">
            <Calendar />
            <span>Bookings</span>
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to={"carManagement"} className="flex items-center gap-2">
            <Car />
            <span>Vehicles</span>
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <Link to={"userManagement"} className="flex items-center gap-2">
            <Users />
            <span>Users</span>
          </Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer text-red-400">
          <LogOut />
          <span >Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
