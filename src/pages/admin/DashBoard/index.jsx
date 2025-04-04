import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./dashboard.module.css";
import instance from "../../../services/api/AxiosConfig";
import { endpoints } from "../../../services/api/Constants";
import rentalController from "../../../services/api/RentalApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBannedUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await instance.get(endpoints.users);
        const carsData = await instance.get(endpoints.cars);
        const rentalsData = await rentalController.getAllRentals();

        setUsers(usersData.data);
        setCars(carsData.data);
        setRentals(rentalsData);

        setStats({
          totalUsers: usersData.data.length,
          totalBannedUsers: usersData.data.filter(
            (user) => user.isBanned === "true"
          ).length,
          totalCars: carsData.data.length,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const getMonthlyRentalData = () => {
    const rentalCounts = {};

    rentals.forEach((rental) => {
      const rentalMonth = new Date(rental.start_Date).toLocaleString("default", {
        month: "long",
      });
      rentalCounts[rentalMonth] = (rentalCounts[rentalMonth] || 0) + 1;
    });

    const sortedMonths = Object.keys(rentalCounts).sort((a, b) => {
      const dateA = new Date(`${a} 1, 2025`);
      const dateB = new Date(`${b} 1, 2025`);
      return dateA - dateB;
    });

    return {
      labels: sortedMonths,
      data: sortedMonths.map((month) => rentalCounts[month]),
    };
  };

  const rentalData = getMonthlyRentalData();

  const chartData = {
    labels: rentalData.labels,
    datasets: [
      {
        label: "Cars Rented",
        data: rentalData.data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Car Rentals",
      },
    },
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statNumber}>{stats.totalUsers}</p>
          <span>Users in the database</span>
        </div>
        <div className={styles.statCard}>
          <h3>Banned Users</h3>
          <p className={styles.statNumber}>{stats.totalBannedUsers}</p>
          <span>Currently banned users</span>
        </div>
        <div className={styles.statCard}>
          <h3>Total Cars</h3>
          <p className={styles.statNumber}>{stats.totalCars}</p>
          <span>Cars listed in the system</span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h3>Car Rental Stats (Monthly)</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
