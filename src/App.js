import React, { useState } from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPage from "./JobsPage";
import SearchJobForm from "./SearchJobForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const val = e.target.val;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: val };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Job Search</h1>
      <SearchJobForm params={params} onParamChange={handleParamChange} />
      <JobsPage page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...Refresh Page...</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
      <JobsPage page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
