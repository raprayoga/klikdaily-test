import React from 'react'
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <>
      <div style={{height: "100vh", width: "100vw"}} className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
    </>
  )
}
