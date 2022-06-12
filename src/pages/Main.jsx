import React, { useEffect, useState } from "react";
import Products from "components/Products";
import DetailOrder from "components/DetailOrder";
import Header from "components/Header";
import { Card, Container, Button } from "react-bootstrap";
import RefetchingCard from "components/RefetchingCard";
import LoadingSpinner from "components/LoadingSpinner";

import get from "services/xhr";
import { EMPLOYEESAPI } from "constant/url";

export default function Main() {
  const [form, setForm] = useState({
    name: "",
    distributionCenter: "",
    paymentType: "",
    expiredDate: "",
    notes: "",
    products: [
      {
        product: "",
        unit: "",
        quantity: "",
        price: 0,
        totalPrice: 0,
      },
    ],
    totalPrice: 0,
  });
  const [confirmActive, setConfirmActive] = useState(true);
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
    getEmployees()
  }, []);

  useEffect(() => {
    let value = false;

    Object.keys(form).map((key) => {
      if (form[key] === "") value = true;
      if (key === "products") {
        form[key].map((item) => {
          Object.keys(item).map((key2) => {
            if (item[key2] === "") value = true;
          });
        });
      }
    });

    setConfirmActive(value);
  }, [form]);

  const updateTotalPrice = () => {
    let totalPrice = 0;
    form.products.forEach((item) => {
      totalPrice += item.totalPrice;
    });

    const formTemp = { ...form };
    formTemp["totalPrice"] = totalPrice;
    setForm(formTemp);
  };

  const onChangeForm = (key, value) => {
    const formTemp = { ...form };
    formTemp[key] = value;
    setForm(formTemp);
  };

  const onChangeFormProduct = (key, value, index) => {
    const formTemp = { ...form };
    formTemp.products[index][key] = value;
    setForm(formTemp);

    updateTotalPrice();
  };

  const addProduct = () => {
    const formTemp = { ...form };
    formTemp["products"].push({
      product: "",
      unit: "",
      quantity: 0,
      price: 0,
      totalPrice: 0,
    });
    setForm(formTemp);
  };

  return (
    <>
      <Header />
      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "idle" ? (
        <Container className="mt-5">
          <Card bg="light" text="dark" className="mb-2">
            <Card.Body>
              <Card.Title>Create Order</Card.Title>
              <Card text="dark" className="mb-2">
                <Card.Body>
                  <DetailOrder
                    employeesList={employees}
                    form={form}
                    onChangeForm={(key, value) => onChangeForm(key, value)}
                  />
                  <Products
                    show={form.name.employee_name && form.distributionCenter}
                    form={form.products}
                    onChangeForm={(key, value, index) =>
                      onChangeFormProduct(key, value, index)
                    }
                    addProduct={() => addProduct()}
                  />
                </Card.Body>
                <div
                  className={`col-md-5 my-5 offset-md-7 px-3 ${
                    form.name.employee_name && form.distributionCenter
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  <div className="row">
                    <div className="col-6 text-start">Total</div>
                    <div className="col-6 text-end">
                      {new Intl.NumberFormat("id").format(
                        parseInt(form.totalPrice)
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="text-end m-3">
                  <Button variant="light" className="mx-3">
                    Cancel
                  </Button>
                  <Button variant="success" disabled={confirmActive}>
                    Confirm
                  </Button>
                </div>
              </Card>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <RefetchingCard
          refetch={() => {
            getEmployees();
          }}
        />
      )}
    </>
  );
}
