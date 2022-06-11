import React from "react";
import { Navbar, Container } from 'react-bootstrap';
import BrandImage from 'assets/image/Klikdaily_Logo_RGB-02.png'

export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={BrandImage} alt="Brand Image" height="30" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
