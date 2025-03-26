import instance from "./AxiosConfig";
import { endpoints } from "./Constants";

// create car
async function createCar(carData) {
    try {
        const response = await instance.post(endpoints.cars, carData)
        return response.data
    } catch (error) {
        console.error("error", error)
        throw error
    }
}
// delete car
async function deleteCar(carId) {
    try {
        const response = await instance.delete(`${endpoints.cars}/${carId}`)
        return response.data
    } catch (error) {
        console.error("error", error)
        throw error
    }
}

// get all cars
async function getAllCar() {
    try {
        const response = await instance.get(endpoints.cars)
        return response.data
    } catch (error) {
        console.error("error", error)
        throw error
    }
}

// update car
async function updateCar(carId, updatedCar) {
    try {
        const response = await instance.put(`${endpoints.cars}/${carId}`, updateCar)
        return response.data
    } catch (error) {
        console.error("error", error)
        throw error
    }
}
// get one car by id
async function getOneCar(carId) {
    try {
        const response = await instance.get(`${endpoints.cars}/${carId}`)
        return response.data
    } catch (error) {
        console.error("error", error)
        throw error
    }
}

const carController = {
    createCar: createCar,
    deleteCar: deleteCar,
    getAllCar: getAllCar,
    getOneCar: getOneCar,
    updateCar: updateCar
}

export default carController;