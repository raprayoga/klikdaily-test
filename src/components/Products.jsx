import React from 'react'

import Select from "react-select";
import { Form } from "react-bootstrap";

import products from "assets/data/products.json";


export default function Products(props) {
  const onChange = (key, value, index) => {
    props.onChangeForm(key, value, index);
  };
  
  
  return (
    <div className={props.show ? 'd-block' : 'd-none'}>
      <hr />
      {props.form.map((product, index) => (
      <div className="row my-3">
        <div className="col-md-2">
          <p>Detail</p>
        </div>
        <div className="col-md-10">
          <div className="row mb-3">
            <div className="col-md-8">
              <label className="form-label">
                Product<span className="text-danger">*</span>
              </label>
              <Select
                name="Select"
                options={products}
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
                options={product.units || [{name: "No Data Available"}]}
                value={product.unit}
                getOptionLabel={(option) => `${option.name}`}
                getOptionValue={(option) => `${option.name}`}
                onChange={(e) => onChange("unit", e, index)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">
                Quantity<span className="text-danger">*</span>
              </label>
              <Form.Control type="number" placeholder="Quantity" 
                value={product.quantity}
                onChange={(e) => onChange("quantity", e, index)}
                />
            </div>
            <div className="col-md-3">
              <label className="form-label">
                Price<span className="text-danger">*</span>
              </label>
              <Form.Control type="number" placeholder="Price" 
                value={product.price}
                disabled
                />
            </div>
            <div className="col-md-6 text-end">
              <label className="form-label">
                Total Price<span className="text-danger">*</span>
              </label>
              <Form.Control type="number" placeholder="Total Price"
                value={product.totalPrice}
                disabled />
            </div>
          </div>
        </div>
      </div>
  ))}
    </div>
  )

}
