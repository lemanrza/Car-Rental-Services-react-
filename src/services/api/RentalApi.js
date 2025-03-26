import { endpoints } from "./Constants";
import instance from "./AxiosConfig";

// create rental
async function createRental(rentalData) {
  try {
    const response = await instance.post(endpoints.rentals, rentalData);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// delete rental
async function deleteRental(rentalId) {
  try {
    const response = await instance.delete(`${endpoints.rentals}/${rentalId}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// get all rentals
async function getAllRentals() {
  try {
    const response = await instance.get(endpoints.rentals);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// get  rental by id
async function getRentalById(rentalId) {
  try {
    const response = await instance.get(`${endpoints.rentals}/${rentalId}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// get rental by car id
async function getRentalscarById(carId) {
  try {
    const response = await instance.get(`${endpoints.rentals}?car_Id=${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// get rental by user id
async function getRentalCarByUserId(carId) {
  try {
    const response = await instance.get(
      `${endpoints.rentals}?user_Id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
// update rental
async function updateRentalStatus(rentalId, status) {
  try {
    const response = await instance.patch(`${endpoints.rentals}/${rentalId}`, {
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
const rentalController = {
  createRental: createRental,
  deleteRental: deleteRental,
  getAllRentals: getAllRentals,
  getRentalById: getRentalById,
  getRentalscarById: getRentalscarById,
  getRentalCarByUserId: getRentalCarByUserId,
  updateRentalStatus: updateRentalStatus,
};

export default rentalController;