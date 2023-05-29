import styled from "styled-components"

export const FormEquipment = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 100%;
`;

export const EquipmentContainer = styled.div`
  display: grid;
  width:100%;
  max-width: 800px;
  margin: 0 auto;
  background: #f8f8f8;
  border-radius: 10px;
  
  @media screen and (max-width: 768px)
  {
    max-width: 100%;
  }
`;
export const LineForm = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 3fr 1fr;
  width: 400px;
  padding: 10px;

  @media screen and (max-width: 768px)
  {
    width: 100%;
  }
`;

export const EquipmentH2 = styled.h2`
  text-align: center;
`;


export const BtnSubmit = styled.button`
  margin: 20px 0;
  border: none;
  border-radius: 40px;
  outline: 0;
  color: #fff;
  font-weight: 700;
  padding: 10px 20px;
  background: linear-gradient(to right, #111 , #222);
  cursor: pointer;
`;