import styled from "styled-components";

export const PageContainer = styled.div`
    margin:auto;
    height:100vh;
    background-color:wheat;
    display:block;
    text-align:center;
    width:90%;
`;

export const Nadpis = styled.h1`
    font-size:16px;
`;

export const Prvek = styled.div`
    display:block;
`;

export const KontrolaButton = styled.div`
display:block;
background-color:yellow;
color:black;
text-decoration:underline;
text-align:center;
${props => {
      if (props.checked === 1) {
         return `
            background-color: green;
         `;
      }
      else if (props.checked === 2) {
         return `
            background-color: red;
         `;
      }
   }}
`;