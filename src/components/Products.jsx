import React, { useState } from "react";

import Select from "react-select";
import { Form, Button } from "react-bootstrap";

import products from "assets/data/products.json";

export default function Products(props) {
  const [productList, setProductList] = useState(products.products);

  const onChange = (key, value, index) => {
    props.onChangeForm(key, value, index);
    if (key === "product") {
      props.onChangeForm("unit", "", index);
      props.onChangeForm("quantity", "", index);
      const newValue = resetOptionUnit(value, index);
      props.onChangeForm(key, newValue, index);
    }
    if (key === "unit") props.onChangeForm("price", value.price, index);
    if (key === "unit" || key == "quantity")
      props.onChangeForm(
        "totalPrice",
        props.form[index].price * props.form[index].quantity,
        index
      );
  };

  const resetOptionUnit = (value, valueIndex) => {
    let newValue = JSON.parse(JSON.stringify(value));
    props.form.map((product, index) => {
      if (product.product.id === newValue.id && index !== valueIndex) {
        const findIndex = newValue.units.findIndex(
          (item) => item.name === product.unit.name
        );
        if (~findIndex) newValue.units.splice(findIndex, 1);
      }
    });
    return newValue;
  };

  return (
    <div className={props.show ? "d-block" : "d-none"}>
      <hr />
      <div className="row my-3">
        <div className="col-md-2">
          <p>Detail</p>
        </div>
        <div className="col-md-10">
          {props.form.map((product, index) => (
            <div key={index} className="mb-5">
              <div className="row mb-3">
                <div className="col-md-8">
                  <label className="form-label">
                    Product<span className="text-danger">*</span>
                  </label>
                  <Select
                    name="Select"
                    options={productList}
                    value={product.product}
                    getOptionLabel={(option) => `${option.product_name}`}
                    getOptionValue={(option) => `${option.product_name}`}
                    onChange={(e) => onChange("product", e, index)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Unit<span className="text-danger">*</span>
                  </label>
                  <Select
                    options={product.product.units}
                    value={product.unit}
                    getOptionLabel={(option) => `${option.name}`}
                    getOptionValue={(option) => `${option.name}`}
                    noOptionsMessage={() => "No data available"}
                    onChange={(e) => onChange("unit", e, index)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">
                    Quantity<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      onChange("quantity", e.target.value, index)
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">
                    Price<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    disabled
                  />
                </div>
                <div className="col-md-6 text-end">
                  <label className="form-label">
                    Total Nett Price<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    type="number"
                    placeholder="Total Price"
                    value={product.totalPrice}
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="offset-md-6 col-md-6">
                  <hr />
                  <div className="row">
                    <div className="col-6 text-start">Total</div>
                    <div className="col-6 text-end">
                      {new Intl.NumberFormat("id").format(
                        parseInt(product.totalPrice)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="warning"
            className="text-light"
            onClick={() => props.addProduct()}
          >
            NEW ITEM +
          </Button>
        </div>
      </div>
    </div>
  );
}
