import styled from "styled-components";
import background from './img/login.png';
import {Link as LinkR} from "react-router-dom";
import {FaUserPlus} from 'react-icons/fa'
export const LoginBox = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 800px;
  height: 600px;
  background: #fff;
  border-radius: 0px 20px 20px 0px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 20px
  }
  
`;

export const LoginImage = styled.div`
  background-image: url(${background});
  background-position-x: 50%;
  background-size: 200%;
  border-radius: 20px 0px 0px 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LoginRight = styled.div`
  display: grid;
  justify-items: center;
`;

export const TitleLogin = styled.div`
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

`;

export const IconRegister = styled(FaUserPlus)`
  color: #55bbff;
  top: 3px;
  font-size: 18px;
  position: relative;
`;