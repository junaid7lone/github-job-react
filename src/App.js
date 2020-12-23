import "./App.css";
import React, { useState } from "react";
import { useFetchJobs } from "./useFetchJobs";
import { Alert, Container } from "react-bootstrap";
import { JobList } from "./JobList";
import SearchBox from "./SearchBox";
import { debounce } from "./debounce";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, error, loading } = useFetchJobs(params, page);

  function inputChange(e) {
    console.log(e.target.name);
    debounce(setParams({ ...params, [e.target.name]: e.target.value }), 400);
  }

  return (
    <Container>
      <h1>JOB LISTING</h1>

      <br></br>
      <SearchBox params={params} onParamsChange={inputChange} />
      <br></br>

      {!loading && <b>Total Jobs ({jobs.length})</b>}
      <br></br>
      {error && (
        <Alert variant="error">
          Something went wrong: Please refresh the page
        </Alert>
      )}
      {loading && <h6 className="text-center">loading...</h6>}
      <JobList jobs={jobs} />
    </Container>
  );
}

export default App;
