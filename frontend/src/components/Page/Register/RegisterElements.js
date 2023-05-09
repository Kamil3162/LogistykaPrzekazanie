import styled from "styled-components";
import background from '../Login/img/login.png';
import {Link as LinkR} from "react-router-dom";
import {FaUserPlus} from 'react-icons/fa'
export const RegisterBox = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const RegisterContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 1200px;
  height: 600px;
  background: #fff;
  border-radius: 0px 20px 20px 0px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 20px;
    height: auto;
  }
  
`;

export const RegisterImage = styled.div`
  height: 600px;
  background-image: url(${background});
  background-position-x: 50%;
  background-size: 200%;
  border-radius: 20px 0px 0px 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const RegisterRight = styled.div`
  display: grid;
  justify-items: center;
`;

export const TitleRegister = styled.div`
  display: grid;
  align-items: center;
  font-weight: 600;
  font-size: 32px;
`;

export const RegisterHref = styled(LinkR)`
  width: 80%;
  color: #536e7a;
  font-weight: 600;
  text-decoration: none;
  text-align: right;
  font-size: 16px;
  margin: 15px 20px;

`;

export const IconRegister = styled(FaUserPlus)`
  color: #55bbff;
  top: 3px;
  font-size: 18px;
  position: relative;
`;