import React, { useEffect, useState } from "react";
import Products from "components/Products";
import DetailOrder from "components/DetailOrder";
import Header from "components/Header";
import { Card, Container } from "react-bootstrap";
import RefetchingCard from "components/RefetchingCard";
import LoadingSpinner from "components/LoadingSpinner";

import get from "services/xhr";
import { EMPLOYEESAPI } from "constant/url";

export default function Main() {
  const [employees, setEmployees] = useState([])
  const [status, setStatus] = useState("error")

//   const getEmployees = async () => {
//     try {
//       setStatus(true)
//       await get(EMPLOYEESAPI)
//         .then((resp) => {
//           setEmployees(resp.data.data)
//         })
//         .catch((error) => {
//           window.$toast.fire({
//             icon: "error",
//             title: error.resp.data.message || "Connection Error",
//           });
//         });
//     } catch (err) {
//       window.$toast.fire({
//         icon: "error",
//         title: "Connection Error",
//       });
//     };
//     setStatus(false)
//   }

  // useEffect(() => {

  //   getEmployees()
  // }, []);


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
        break;
      
      case 'loading':
        return (
          <LoadingSpinner />
        )
        break;

        case 'error':
        return (
          <RefetchingCard />
        )
        break;
    
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
