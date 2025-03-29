import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Edit } from "lucide-react"; 
import Swal from "sweetalert2";

const CarManagement = () => {
  const navigate = useNavigate();
  const [cars, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setFilteredVehicles(data);
      });
  }, []);

  useEffect(() => {
    let filtered = cars;

    if (searchQuery) {
      filtered = filtered.filter((car) =>
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((car) =>
        car.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredVehicles(filtered);
  }, [searchQuery, selectedCategory, cars]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this car?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" })
          .then(() => {
            setVehicles(cars.filter((vehicle) => vehicle.id !== id));
            Swal.fire("Deleted!", "The car has been deleted.", "success");
          })
          .catch((error) => console.error("Error deleting car:", error));
      }
    });
  };

  const handleUpdate = (car) => {
    navigate(`/admin/carManagement/${car.id}`);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddCar = () => {
    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicles([...cars, data]);
        setFilteredVehicles([...cars, data]);
        toggleModal();
        Swal.fire("Success!", "Car added successfully!", "success");
      })
      .catch((error) => console.error("Error adding car:", error));
  };

  return (
    <div className="p-6 ml-64 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">All Vehicles</h1>

      <div className="flex items-center gap-4 mb-4 justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>
        <div>
          <button
            onClick={toggleModal}
            className="py-2 px-4 border border-blue-300 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            + Add New Car
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Model</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price per day</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((car) => (
              <tr key={car.id} className="border-b">
                <td className="px-4 py-2">{car.id}</td>
                <td className="px-4 py-2">{car.brand}</td>
                <td className="px-4 py-2">{car.model}</td>
                <td className="px-4 py-2">{car.category}</td>
                <td className="px-4 py-2">${car.price}</td>
                <td className="px-4 py-2 flex gap-4">
                  <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:text-red-700">
                    <Trash className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleUpdate(car)} className="text-blue-500 hover:text-blue-700">
                    <Edit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">No vehicles found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Add New Car</h2>
            <input
              type="text"
              placeholder="Brand"
              className="w-full p-2 mb-2 border"
              onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            />
            <input
              type="text"
              placeholder="Model"
              className="w-full p-2 mb-2 border"
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
             <input
              type="text"
              placeholder="Year"
              className="w-full p-2 mb-2 border"
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
            />
             <input
              type="text"
              placeholder="Price per day"
              className="w-full p-2 mb-2 border"
              onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            />
            <button onClick={handleAddCar} className="py-2 px-4 bg-green-500 text-white rounded">
              Add Car
            </button>
            <button onClick={toggleModal} className="py-2 px-4 bg-gray-500 text-white rounded ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManagement;
