import React from "react";
import { Navbar } from "react-bootstrap";
import BrandImage from "assets/image/Klikdaily_Logo_RGB-02.png";

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="px-3">
        <Navbar.Brand href="#home">
          <img src={BrandImage} alt="Brand Image" height="30" />
        </Navbar.Brand>
      </Navbar>
    </>
  );
}
