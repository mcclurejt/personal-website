import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Nav = styled.nav`
  background: transparent;
  /* height: 60px; */
  display: flex;
  padding: 0.2rem calc((100vw-1000px) / 2);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin: 5px 20px;
  text-decoration: none;
  font-family: "Fredoka One", cursive;
  color: ${(props) => props.color};
  font-size: 24px;
  &.active {
    text-decoration: underline;
  }
`;

function NavBar() {
  return (
    <Nav>
      <StyledNavLink to="/" color="#00a743">
        Home
      </StyledNavLink>
      <StyledNavLink to="/Experience" color="#e77002">
        Experience
      </StyledNavLink>
    </Nav>
  );
}

export default NavBar;
