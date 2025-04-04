
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import carController from "../../../services/api/CarApi";
import "./cars.css";

const Cars = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carsData = await carController.getAllCar()
                setCars(carsData)
            }
            catch (error) {
                console.error("Error loading dashboard data:", error);
            }
        }
        fetchData()
    }, []);

    const handleViewDetails = (carId) => {
        navigate(`/cars/${carId}`);
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', padding: "30px 0", fontSize: "30px", fontWeight: 700 }}>Cars List</h2>
            <section className='cars-body'>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {cars.map((car) => (
                            <li key={car.id} className="group block overflow-hidden">
                                <img
                                    src={car.image}
                                    alt={car.brand}
                                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                />
                                <div className="relative bg-white pt-3 px-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                Brand: {car.brand}
                                            </h3>
                                            <h3 className="text-xs text-gray-700 mt-2">
                                                Model: {car.model}
                                            </h3>
                                            <p className="mt-1 tracking-wider text-gray-900">${car.price}</p>
                                        </div>
                                        <div className="flex flex-col justify-end gap-2">
                                            <button
                                                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                                onClick={() => handleViewDetails(car.id)}
                                            >
                                                View Details
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Cars;
