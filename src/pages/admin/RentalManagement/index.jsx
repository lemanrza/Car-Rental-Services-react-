import { useEffect, useState } from "react";
import rentalController from "../../../services/api/RentalApi";

const RentalManagement = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const rentalsData = await rentalController.getAllRentals()
        setRentals(rentalsData)
      }
      catch (error) {
        console.error("Error: ", error)
      }
    }
    fetchdata()
  }, []);

  const handleApprove = (rentalId) => {
    fetch(`http://localhost:3000/rentals/${rentalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approved: true }),
    })
      .then((response) => response.json())
      .then((updatedRental) => {
        setRentals((prev) =>
          prev.map((rental) =>
            rental.id === rentalId ? updatedRental : rental
          )
        );
      });
  };

  return (
    <div className="p-5 ml-64">
      <h2 className="text-2xl font-semibold mb-4">Rental Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Car ID</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td className="border p-2">{rental.user_Id}</td>
              <td className="border p-2">{rental.car_Id}</td>
              <td className="border p-2">{rental.start_Date}</td>
              <td className="border p-2">{rental.end_Date}</td>
              <td className="border p-2">$ {rental.total_cost}</td>
              <td className="border p-2">
                {!rental.approved ? (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleApprove(rental.id)}
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-green-600 font-semibold">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalManagement;
