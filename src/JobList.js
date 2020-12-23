import { ListGroup, Media, Badge } from "react-bootstrap";

export function JobList({ jobs }) {
  return (
    <ListGroup>
      {jobs.map((job) => {
        return (
          <ListGroup.Item key={job.id}>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={job.company_logo}
              />
              <Media.Body>
                <h5>
                  <a href={job.url} className="text-black text-decoration-none">
                    {job.title} at {job.company}{" "}
                  </a>
                  <small className="float-right text-small text-muted">
                    {job.created_at}
                  </small>
                </h5>
                <p>{job.description.slice(0, 200)}</p>
                <p>
                  <Badge variant="secondary">{job.location}</Badge>&nbsp;
                  <Badge variant="secondary">{job.type}</Badge>
                </p>
              </Media.Body>
            </Media>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
