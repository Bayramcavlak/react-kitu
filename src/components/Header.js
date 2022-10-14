import React from "react";
import styled from "styled-components";
import headerLogo from "../Images/wild.png";
const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  // margin-top: 10px;
  height: 10%;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  img {
    width: 10%;
    max-height: 90px;
    margin: 10px;
  }
`;

const Header = () => {
  return (
    <Container>
      <img src={headerLogo} alt="logo" />
    </Container>
  );
};
export default Header;
