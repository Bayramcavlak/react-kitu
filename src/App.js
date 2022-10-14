import React from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Find from "./components/Find";
import List from "./components/List";
import Http from "./components/Http";
import { MainContext } from "./Context";
import DialogDelete from "./components/Dialogs/DialogDelete";
import DialogEdit from "./components/Dialogs/DialogEdit";
import { useState } from "react";

const App = () => {
  const [dialogDelete, setDialogDelete] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [delJobs, setDelJobs] = useState([]);
  const [editJobs, setEditJobs] = useState([]);

  const data = {
    delJobs,
    setDelJobs,
    editJobs,
    setEditJobs,
    setJobs,
    setPriorityData,
    dialogDelete,
    setDialogDelete,
    dialogEdit,
    setDialogEdit,
    jobs: jobs,
    priorityData: priorityData,
  };

  return (
    <MainContext.Provider value={data}>
      <div className="app">
        <Header />
        <Form />
        <Find />
        <List />
        <Http />
        <Footer />
        <DialogDelete />
        <DialogEdit />
      </div>
    </MainContext.Provider>
  );
};

export default App;
