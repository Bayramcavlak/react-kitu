import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { red, blue, grey } from "@mui/material/colors";
import { MainContext, useContext } from "../Context";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  height: 10%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ccc;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  thead {
    background-color: ${blue[100]};
    color: ${grey[500]};
  }
  ,
  th,
  td {
    text-align: left;
    padding: 8px;
  }
  .action {
    text-align: right;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const List = () => {
  useContext(MainContext);
  const {
    setJobs,
    jobs,
    setDialogDelete,
    setDialogEdit,
    priorityData,
    setDelJobs,
    setEditJobs,
  } = useContext(MainContext);
  const [sortJobs, setSortJobs] = useState([]);

  useEffect(() => {
    const localJobs = () => {
      const jobsClone = JSON.parse(localStorage.getItem("jobs"));
      if (jobsClone) {
        try {
          // setJobs(jobsClone.jobs);
          setSortJobs(jobsClone.jobs);
        } catch (error) {
          console.log(error);
        }
        // const newJob = jobsClone.jobs.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.name,
        //     priority: item.priority,
        //   };
        // });
        // setSortJobs(newJob);
        // setJobs(newJob);
      }
    };
    localJobs();
  }, [setJobs, jobs]);

  // sorting by priority
  useEffect(() => {
    const sortPriority = jobs.sort((a, b) => {
      return a.priority - b.priority || a.name.localeCompare(b.name);
    });
    setSortJobs(sortPriority);
  }, [jobs]);

  const handleDelete = (id) => {
    setDelJobs(id);
    setDialogEdit(false);
    setDialogDelete(true);
  };

  const handleEdit = (id) => {
    setEditJobs(id);
    setDialogDelete(false);
    setDialogEdit(true);
  };

  // which color for priority
  const renderPriority = (priority) => {
    const priorityItem = priorityData.find((item) => item.id === priority);
    return (
      <div
        style={{
          backgroundColor: priorityItem.color,
          color: "white",
          borderRadius: "5px",
        }}
      >
        <b>{priorityItem.name}</b>
      </div>
    );
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ textAlign: "center" }}>Priority</th>
            <th className="action" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.name}</td>
              <td style={{ textAlign: "center" }}>
                {renderPriority(job.priority)}
              </td>
              <td className="action">
                <button
                  onClick={() => handleEdit(job.id)}
                  style={{ marginRight: "10px" }}
                >
                  <ModeEditIcon style={{ color: blue[500] }} />
                </button>
                <button onClick={() => handleDelete(job.id)}>
                  <DeleteIcon style={{ color: red[500] }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default List;
