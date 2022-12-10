import styled from "styled-components";

export const Layout = styled.div`
  padding-bottom: 150px;
`;

export const TableHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  height: 64px;
  border-bottom: 1px solid rgba(38, 41, 46, 0.1);
  z-index: 2;
  background-color: #fff;
`;


export const TableItem = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 24px 0;
  border-bottom: 1px solid rgba(38, 41, 46, 0.05);
`;

export const Cell = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(38, 41, 46, 0.6);
`;

