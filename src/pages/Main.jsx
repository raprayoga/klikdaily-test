import React, { useEffect, useState } from "react";
import Products from "components/Products";
import DetailOrder from "components/DetailOrder";
import Header from "components/Header";
import { Card, Container, Button } from "react-bootstrap";
import RefetchingCard from "components/RefetchingCard";
import LoadingSpinner from "components/LoadingSpinner";
import employessdata from "assets/data/employess.json";

import get from "services/xhr";
import { EMPLOYEESAPI } from "constant/url";

export default function Main() {
  const [form, setForm] = useState({
    name: "",
    distributionCenter: "",
    paymentType: "",
    expiredDate: "",
    notes: "",
    products: [{
      product: "",
      unit: "",
      quantity: "",
      price: "",
      totalPrice: ""
    }],
  });
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("idle");

  const getEmployees = async () => {
    try {
      setStatus("loading");
      await get(EMPLOYEESAPI)
        .then((resp) => {
          setEmployees(resp.data.data);
          setStatus("idle");
        })
        .catch((error) => {
          setStatus("error");
        });
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    setEmployees(employessdata.data);
    // getEmployees()
  }, []);

  const onChangeForm = (key, value) => {
    const formTemp = { ...form };
    formTemp[key] = value;
    setForm(formTemp);
  }

  const onChangeFormProduct = (key, value, index) => {
    const formTemp = { ...form };
    formTemp.products[index][key] = value;
    setForm(formTemp);
  }

  const Main = () => {
    switch (status) {
      case "idle":
        return (
          <Container>
            <Card bg="light" text="dark" className="mb-2">
              <Card.Body>
                <Card.Title>Create Order</Card.Title>
                <Card text="dark" className="mb-2">
                  <Card.Body>
                    <DetailOrder employeesList={employees} form={form} onChangeForm={(key, value) => onChangeForm(key, value)} />
                    <Products show={form.name.employee_name && form.distributionCenter} form={form.products} onChangeForm={(key, value, index) => onChangeFormProduct(key, value, index)} />
                  </Card.Body>
                  <hr />
                  <div className="text-end m-3">
                    <Button variant="light" className="mx-3">Cancel</Button>
                    <Button variant="success" disabled>Confirm</Button>
                  </div>
                </Card>
              </Card.Body>
            </Card>
          </Container>
        );

      case "loading":
        return <LoadingSpinner />;

      case "error":
        return (
          <RefetchingCard
            refetch={() => {
              getEmployees();
            }}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <Main />
    </>
  );
}
