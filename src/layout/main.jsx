import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log("Инициализация данных в FireBase");
    initialize();
    // Здесь можно добавить логику для инициализации данных
  };
  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <h3>Иннициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        <i className="bi bi-cloud-arrow-down-fill"></i> Инициализировать данные
      </button>
    </div>
  );
};

export default Main;
