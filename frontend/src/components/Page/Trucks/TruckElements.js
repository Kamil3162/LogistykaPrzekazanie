import styled from 'styled-components';
export const TrucksBox = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
export const TrucksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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

export const DataCol = styled.div`
  width: 100%;
  background: #fffae9;
  padding: 20px;
  box-sizing: border-box;
  margin: 10px 0;
`;
export const BtnDelete = styled.button`
  background: linear-gradient(to right, #ce4747, #c13030);
  outline: 0;
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  margin: 0 10px;
`;

export const BtnModify = styled.button`
  background: linear-gradient(to right, #97bc7c, #53ab53);
  outline: 0;
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  margin: 0 10px;
`;
