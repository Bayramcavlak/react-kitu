import React, { Fragment, useEffect } from "react";
import { MainContext, useContext } from "../Context";

const Http = () => {
  useContext(MainContext);
  const { setJobs, setPriorityData } = useContext(MainContext);

  const jobs_endpoint = "http://localhost:5000/api/jobs";
  const priority_endpoint = "http://localhost:5000/api/priority";

  useEffect(() => {
    const getJobs = async () => {
      await fetch(jobs_endpoint)
        .then((response) => response.json())
        .then((response) => {
          setJobs(response.jobs);
          localStorage.setItem("jobs", JSON.stringify(response));
          // console.log(response.jobs);
        })
        .catch((err) => console.error(err));
    };
    getJobs();
  }, [setJobs]);

  useEffect(() => {
    const getPriority = async () => {
      await fetch(priority_endpoint)
        .then((response) => response.json())
        .then((response) => {
          setPriorityData(response.priority);
          // console.log(response.priority);
        })
        .catch((err) => console.error(err));
    };
    getPriority();
  }, [setPriorityData]);

  return <Fragment></Fragment>;
};

export default Http;
