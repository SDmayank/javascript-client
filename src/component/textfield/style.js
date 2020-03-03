
import styled, { css } from 'styled-components';

const Input = styled.input`
${(props) => props.value === 'Disabled Input'
&& css`
width: 100%;

`};
${(props) => props.value === 'Accessible'
&& css`
width: 100%;
background-color: white;
`};
${(props) => props.value === 101 && props.value > 100
&& css`
width: 100%;
background-color: white;
border-color: red;
`};
`;
const Para = styled.p`
font-weight:bold
`;

const Div = styled.div`
padding: 2%;
border: 1px solid black;
border-radius: 4px;

`;

const P = styled.p`
color: red;
`;

export default Input;
export { Para, Div, P };
