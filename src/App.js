import React from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";

function App() {
  // get JSON request from useFetchJobs() hook with diff states, like jobs, loading, error
  const { jobs, loading, error } = useFetchJobs();
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...Refresh Page...</h1>}
      <h1>{jobs.length}</h1>
    </Container>
  );
}

export default App;
