import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";

import DcNames from "assets/data/distributionCenter.json";
import PaymentMethod from "assets/data/paymentMethod.json";

export default function Detil(props) {
  const [dcnames, setDcnames] = useState([{dc_name: "No data available"}]);

  const onChange = (key, value) => {
    if (key === "name") setDcnames(DcNames.data);
    props.onChangeForm(key, value);
  };
  

  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <p>Detail</p>
        </div>
        <div className="col-md-10">
          <div className="mb-3">
            <label className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <Select
              className="col-md-8"
              name="Select"
              options={props.employeesList}
              value={props.form.name}
              getOptionLabel={(option) => `${option.employee_name}`}
              getOptionValue={(option) => `${option.employee_name}`}
              onChange={(e) => onChange("name", e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Distribution Center<span className="text-danger">*</span>
            </label>
            <Select
              className="col-md-6"
              options={dcnames}
              value={props.form.distributionCenter}
              getOptionLabel={(option) => `${option.dc_name}`}
              getOptionValue={(option) => `${option.dc_name}`}
              onChange={(e) => onChange("distributionCenter", e)}
            />
          </div>
          <div
            className={
              props.form.name.employee_name && props.form.distributionCenter
                ? "d-block"
                : "d-none"
            }
          >
            <div className={`mb-3 row`}>
              <div className="col-md-6">
                <label className="form-label">
                  Payment Type<span className="text-danger">*</span>
                </label>
                <Select
                  options={PaymentMethod.data}
                  value={props.form.paymentType}
                  getOptionLabel={(option) => `${option.payment_type}`}
                  getOptionValue={(option) => `${option.payment_type}`}
                  onChange={(e) => onChange("paymentType", e)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Payment Type<span className="text-danger">*</span>
                </label>
                <DatePicker
                  name="tgl_lahir"
                  selected={props.form.expiredDate}
                  onChange={(e) => onChange("expiredDate", e)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="form-control"
                  placeholderText="Expired date"
                />
              </div>
            </div>
            <div>
              <label className="form-label">
                Payment Type<span className="text-danger">*</span>
              </label>
              <Form.Control
                className="col-md-8"
                as="textarea"
                rows={3}
                value={props.form.notes}
                onChange={(e) => onChange("notes", e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
