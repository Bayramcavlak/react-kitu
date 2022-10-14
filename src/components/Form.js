import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import inputs from "../components/UI/Styles/Style.module.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Button from "@mui/material/Button";
import { MainContext, useContext } from "../Context";

const Container = styled.div`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 50px;
  margin-top: 50px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
`;
const StyledForm = styled.form`
  margin-top: 10px;
  width: 100%;
`;

const Form = () => {
  useContext(MainContext);
  const { priorityData, setJobs, jobs } = useContext(MainContext);
  const inputName = useRef();
  const inputSelect = useRef();
  const handlInput = (e) => {
    const regexInput = /^[-_ a-zA-Z0-9]+$/;
    if (
      inputName.current.value.length > 255 ||
      !regexInput.test(inputName.current.value)
    ) {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputName.current.value.length === 0 ||
      inputSelect.current.value === ""
    ) {
      return;
    }

    const newJob = {
      id: Math.floor(Math.random() * 100000000),
      name: inputName.current.value,
      priority: Number(inputSelect.current.value),
    };
    setJobs((prev) => [...prev, newJob]);
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
  };

  return (
    <Fragment>
      <Container>
        <div>
          <b>Create New Job</b>
        </div>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Label htmlFor="name">Job name</Label>
              <input
                ref={inputName}
                onInput={handlInput}
                id="name"
                className={inputs.input}
                type="text"
                placeholder="Job Name"
              />
            </Grid>
            <Grid xs={4}>
              <Label htmlFor="priority">Priority</Label>
              <select
                ref={inputSelect}
                id="priority"
                name="priority"
                className={inputs.select}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Choose
                </option>
                {priorityData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              <Button
                type="submit"
                size="medium"
                variant="contained"
                style={{ marginLeft: "10px" }}
              >
                + Create
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      </Container>
    </Fragment>
  );
};

export default Form;
