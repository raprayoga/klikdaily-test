import React from "react";
import Multiselect from "multiselect-react-dropdown";

export default function Detil(props) {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <p>Detail</p>
        </div>
        <div className="col-6">
          <Multiselect
            options={props.data} // Options to display in the dropdown
          />
        </div>
      </div>
    </>
  );
}
