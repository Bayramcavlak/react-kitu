import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MainContext, useContext } from "../../Context";

const DialogDelete = () => {
  useContext(MainContext);
  const { dialogDelete, setDialogDelete, setJobs, jobs, delJobs } =
    useContext(MainContext);

  const handleClose = () => {
    // console.log(dialog);
    setDialogDelete(false);
  };

  const handleApprove = () => {
    const filtered = jobs.filter((job) => job.id !== delJobs);
    setJobs(filtered);
    localStorage.setItem("jobs", JSON.stringify(filtered));

    // console.log(dialog);
    setDialogDelete(false);
  };

  return (
    <div>
      <Dialog
        open={dialogDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Alert severity="error">
            <p>Do you approval the removal?</p>
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            İf you remove the job, you will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApprove} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogDelete;
