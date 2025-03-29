import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleRentNow = () => {
    setIsModalOpen(true);
    setTotalPrice(car.price);
  };

  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value) || 0;
    setRentalDays(days);
    setTotalPrice(days * car.price);
  };

  const handleRent = () => {
    // alert(`Successfully rented for ${rentalDays} days. Total cost: £${totalPrice}`);
    setIsModalOpen(false);
    setRentalDays(0)
  };

  if (!car) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  return (
    <>
      <div className="text-left m-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => history.back()}
        >
          ← Back to Cars List
        </button>
      </div>
      <div className="flex justify-center m-5">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-3xl font-semibold my-4">
            {car.brand} {car.model} - {car.year}
          </h2>
          <div className="text-center mb-4">
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-[400px] object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <p className="text-lg"><b>Price per day:</b> £{car.price}</p>
              <p className="text-lg"><b>Description:</b> {car.description}</p>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleRentNow}
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Rent this car</h3>
            <p className="mb-2">How many days do you want to rent this car?</p>
            <input
              type="number"
              min="1"
              value={rentalDays}
              onChange={handleDaysChange}
              className="w-full border p-2 rounded-md mb-2"
            />
            <p className="text-lg font-semibold">
              Total Price: £{totalPrice}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleRent}
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetail;
