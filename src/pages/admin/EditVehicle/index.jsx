import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        category: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setVehicle(data))
            .catch((err) => console.error("Error fetching car data:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this vehicle?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/cars/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vehicle),
                })
                    .then((res) => res.json())
                    .then(() => {
                        Swal.fire(
                            "Updated!",
                            "The vehicle has been updated successfully.",
                            "success"
                        );
                        navigate("/admin/carManagement");
                    })
                    .catch((err) => {
                        console.error("Error updating vehicle:", err);
                        Swal.fire("Error!", "Failed to update vehicle.", "error");
                    });
            }
        });
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Changes you made will not be saved!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/admin/carManagement");
            }
        });
    };

    return (
        <div className="p-6 ml-64 h-screen flex flex-col justify-center bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Edit Vehicle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="brand"
                    value={vehicle.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="model"
                    value={vehicle.model}
                    onChange={handleChange}
                    placeholder="Model"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <input
                    type="number"
                    name="year"
                    value={vehicle.year}
                    onChange={handleChange}
                    placeholder="Year"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={vehicle.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full p-2 border rounded-lg"
                    required
                />
             <select
  name="category"
  value={vehicle.category}
  onChange={handleChange}
  className="w-full p-2 border rounded-lg"
  required
>
  <option value="">Select Category</option>
  <option value="SUV">SUV</option>
  <option value="Sedan">Sedan</option>
  <option value="Truck">Truck</option>
  <option value="Convertible">Convertible</option>

</select>

                <input
                    type="text"
                    name="description"
                    value={vehicle.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={vehicle.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Update Vehicle
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditVehicle;
