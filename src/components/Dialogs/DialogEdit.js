import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import inputs from "../UI/Styles/Style.module.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import styled from "styled-components";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MainContext, useContext } from "../../Context";

const Label = styled.label`
  display: block;
`;

export default function FormDialog() {
  useContext(MainContext);
  const { dialogEdit, setDialogEdit, editJobs, setJobs, jobs, priorityData } =
    useContext(MainContext);
  const [editPriorite, setEditPriorite] = useState([]);
  const inputSelect = useRef(null);

  useEffect(() => {
    const getJobs = () => {
      const filter = jobs.filter((job) => job.id === editJobs);
      setEditPriorite(filter);
    };
    getJobs();
  }, [editJobs, jobs]);

  const handleApprove = () => {
    const updateJobs = jobs.map((job) => {
      if (job.id === editJobs) {
        return {
          ...job,
          priority: Number(inputSelect.current.value),
        };
      }
      return job;
    });
    localStorage.setItem("jobs", JSON.stringify(updateJobs));
    try {
      setJobs(updateJobs);
      setDialogEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setDialogEdit(false);
  };

  return (
    <div>
      <Dialog open={dialogEdit} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Label htmlFor="name">Job name</Label>
              <input
                id="name"
                className={inputs.input}
                type="text"
                defaultValue={editPriorite[0]?.name}
              />
            </Grid>
            <Grid xs={12}>
              <Label htmlFor="priority">Priority</Label>
              <select
                ref={inputSelect}
                id="priority"
                name="priority"
                className={inputs.select}
                value={editPriorite[0]?.priority}
                onChange={(e) => setEditPriorite(e.target.value)}
              >
                {priorityData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApprove}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
