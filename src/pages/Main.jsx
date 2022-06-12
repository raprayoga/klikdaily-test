import React, { useEffect, useState } from "react";
import Products from "components/Products";
import DetailOrder from "components/DetailOrder";
import Header from "components/Header";
import { Card, Container } from "react-bootstrap";
import RefetchingCard from "components/RefetchingCard";
import LoadingSpinner from "components/LoadingSpinner";
import employessdata from "assets/data/employess.json"

import get from "services/xhr";
import { EMPLOYEESAPI } from "constant/url";

export default function Main() {
  const [employees, setEmployees] = useState([])
  const [status, setStatus] = useState("idle")

  const getEmployees = async () => {
    try {
      setStatus('loading')
      await get(EMPLOYEESAPI)
        .then((resp) => {
          setEmployees(resp.data.data)
          setStatus('idle')
        })
        .catch((error) => {
          setStatus('error')
        });
    } catch (err) {
      setStatus('error')
    };
  }

  useEffect(() => {
    setEmployees(employessdata.data)
    // getEmployees()
  }, []);


  const Main = () => {
    switch (status) {
      case 'idle':
        return (
          <Container>
            <Card bg="light" text="dark" className="mb-2">
              <Card.Body>
                <Card.Title>Create Order</Card.Title>
                <Card text="dark" className="mb-2">
                  <Card.Body>
                    <DetailOrder data={employees} />
                    <Products />
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Container>
        )
      
      case 'loading':
        return (
          <LoadingSpinner />
        )

      case 'error':
        return (
          <RefetchingCard refetch={() => {getEmployees()}} />
        )
    
      default:
        break;
    }
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
}
