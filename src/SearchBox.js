import React from "react";
import { Form, Col } from "react-bootstrap";

function SearchBox({ params, onParamsChange, onSearch }) {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            name="description"
            onChange={onParamsChange}
            defaultValue={params.description}
            placeholder="Search Jobs"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            name="location"
            onChange={onParamsChange}
            defaultValue={params.location}
            placeholder="Location"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

export default SearchBox;
