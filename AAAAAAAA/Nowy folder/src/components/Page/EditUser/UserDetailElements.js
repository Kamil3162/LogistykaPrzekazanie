import styled from 'styled-components';
export const EditUserBox = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const EditUserContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; 
  width: 800px;
  height: auto;
  background: #f8f8f8;
  border-radius: 0px 20px 20px 0px;
  padding: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 20px;
  }

`;

export const EditUserInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 300px;
  margin: 0 auto;
  
`;

export const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 768px) {
    display: block;
  }
  

`;