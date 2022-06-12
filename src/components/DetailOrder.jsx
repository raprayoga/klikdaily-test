import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import DcNames from "assets/data/distributionCenter.json";
import Select from "react-select";

export default function Detil(props) {
  const [form, setForm] = useState({
    name: "",
    distributionCenter: "",
    paymentType: "",
    expiredDate: "",
    notes: "",
    products: [],
  });
  const [dcnames, setDcnames] = useState([{dc_name: "No data available"}]);
  console.log(DcNames.data)

  const onSelectName = (value) => {
    const formTemp = { ...form };
    formTemp.name = value;
    setForm(formTemp);
    setDcnames(DcNames.data)
    console.log(dcnames)
  };

  const onSelectDc = (value) => {
    const formTemp = { ...form };
    formTemp.distributionCenter = value;
    setForm(formTemp);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <p>Detail</p>
        </div>
        <div className="col-md-8">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <Select
              className="col-md-8"
              options={props.data}
              value={form.name}
              getOptionLabel={(option) => `${option.employee_name}`}
              getOptionValue={(option) => `${option.employee_name}`}
              onChange={onSelectName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Distribution Center<span className="text-danger">*</span>
            </label>
            <Select
              className="col-md-6"
              options={dcnames}
              value={form.distributionCenter}
              getOptionLabel={(option) => `${option.dc_name}`}
              getOptionValue={(option) => `${option.dc_name}`}
              onChange={onSelectDc}
            />
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}
