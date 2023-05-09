import styled from 'styled-components';
import {Link as LinkR} from 'react-router-dom';

export const Nav = styled.nav`
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  
  @media screen and (max-width: 960px) {
    transition:  0.8s all ease;
  }

`;

export const NavContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1300px;
  height: 80px;
  
    `;

export const NavLogo = styled.div`
  display: flex;
  font-size: 2em;
  font-family: 'Ubuntu', sans-serif;
  align-items: center;
    `;

export const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;    
`;

export const NavLinks = styled(LinkR)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.hover {
    color: #affaff;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #111;
  color: #fff;
  white-space: nowrap;
  padding: 10px 22px;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #3e4e74;
    color: #ffffff;
  }
`;