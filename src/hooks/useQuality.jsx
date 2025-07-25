import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function getQuality(id) {
    return qualities.find((q) => q._id === id);
  }

  async function getQualitiesList() {
    try {
      // Simulating an API call
      const { content } = await qualityService.fetchAll();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response
      ? error.response.data
      : { message: "An error occurred" };
    setError(message);
  }

  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
