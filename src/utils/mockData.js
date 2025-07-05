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

  const incermentCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);

    if (progress < newProgress) {
      setProgress(() => newProgress);
    }

    if (newProgress === 100) {
      setStatus(statusConsts.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpService.put("profession/" + prof._id, prof);
        incermentCount();
      }
      for (const user of users) {
        await httpService.put("user/" + user._id, user);
        incermentCount();
      }
      for (const quality of qualities) {
        await httpService.put("quality/" + quality._id, quality);
        incermentCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
