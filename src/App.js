import React, { useState } from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs(params, page);
  return (
    <Container className="my-4">
      <h1 className="mb-4">Jobs GitHub</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...Refresh Page...</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
    </Container>
  );
}

export default App;
