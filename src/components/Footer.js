import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f2f2f2;
  text-align: center;
`;

const Footer = () => {
  return <StyledFooter> Since 2022 </StyledFooter>;
};
export default Footer;
