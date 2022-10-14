import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import inputs from "../components/UI/Styles/Style.module.css";
import blue from "@mui/material/colors/blue";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { MainContext, useContext } from "../Context";

const Container = styled.div`
  border: 1px solid ${blue[100]};
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  background-color: ${blue[50]};
`;

const Find = () => {
  useContext(MainContext);
  const { priorityData, setJobs } = useContext(MainContext);
  const inputName = useRef();
  const inputSelect = useRef();

  const handlInput = () => {
    const jobsClone = JSON.parse(localStorage.getItem("jobs"));
    if (inputName.current.value.length === 0) {
      const newJob = jobsClone.jobs.map((item) => {
        return {
          id: item.id,
          name: item.name,
          priority: item.priority,
        };
      });
      setJobs(newJob);
    }

    const regexInput = /^[-_ a-zA-Z0-9]+$/;
    if (
      inputName.current.value.length > 255 ||
      !regexInput.test(inputName.current.value)
    ) {
      return;
    }

    const findJob = jobsClone.jobs.filter((job) => {
      return job.name.toLowerCase().includes(inputName.current.value);
    });

    setJobs(findJob);
  };

  return (
    <Fragment>
      <div>
        <b>Job List</b>
      </div>
      <Container>
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8}>
              <input
                ref={inputName}
                onInput={handlInput}
                type="text"
                className={inputs.input}
                placeholder="Job Name"
              />
            </Grid2>
            <Grid2 xs={4}>
              <select
                ref={inputSelect}
                type="text"
                name="priority"
                className={inputs.select_find}
                defaultValue={"all"}
              >
                <option value="all">Priority (All)</option>
                {priorityData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid2>
          </Grid2>
        </form>
      </Container>
    </Fragment>
  );
};

export default Find;
