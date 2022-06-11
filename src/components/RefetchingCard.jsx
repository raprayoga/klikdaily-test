import React from 'react'
import { Card } from "react-bootstrap";

export default function RefetchingCard() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
      <Card bg="light" text="dark" className="col-md-6 mb-2">
        <Card.Body>
          <Card text="dark" className="mb-2">
            <Card.Body>
              <div className="col-6">
              <i class="bi-alarm"></i>
                <i className="bi bi-arrow-clockwise"></i>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}
