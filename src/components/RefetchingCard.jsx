import React from 'react'
import { Card } from "react-bootstrap";
import ArrowClockwise from "assets/image/arrow-clockwise.svg"

export default function RefetchingCard(props) {
  const refetch = () => {
    props.refetch()
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100hv', width: '100hw'}}>
      <Card bg="light" text="dark" className="col-12 col-md-8 mb-2">
        <Card.Body>
          <Card text="dark" className="mb-2">
            <Card.Body>
              <div className="row d-flex justify-content-around align-items-center">
                <div className="col-6 text-center">
                  <img src={ArrowClockwise} alt="Bootstrap" width="52" height="52" style={{cursor: 'pointer'}} onClick={() => {refetch()}}/>
                </div>
                <div className="col-6">
                  <p>Gagal Memuat</p>
                  <p>Silahkan klik icon untuk memuat ulang</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}
