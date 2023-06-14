import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LinkEl = styled(NavLink)`
  padding: 5px 20px;
  text-decoration: none;
  color: black;
  &.active {
    color: purple;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const Header = styled.header`
  padding-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 1px 5px #908060;
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: white;
`;

export const NavEl = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Loading = styled.h3`
  padding: 25px;
`;

export const HomeBox = styled.div`
display: flex;
`