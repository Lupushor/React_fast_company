import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import httpService from "../services/http.service";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";

const useMockData = () => {
  const statusConsts = {
    idle: "Not Started",
    pending: "In process",
    success: "Ready",
    error: "Error occured",
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = professions.length + qualities.length + users.length;

  const incermentCount = (params) => {
    setCount((prevCount) => prevCount + 1);
  };

  const updateProgress = (params) => {};

  useEffect(() => {
    const newProgress = Math.round((count / summaryCount) * 100);

    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incermentCount();
      }
    } catch (error) {
      setError(error);
    }
  }

  return { error, initialize };
};

export default useMockData;
