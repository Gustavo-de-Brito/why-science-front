import styled from 'styled-components';

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 880px;
  background-color: #FFFFFF;
  border-radius: 20px;

  h1 {
    margin: 140px 0 100px 0;
    font-family: 'Hammersmith One', sans-serif;
    font-size: 60px;
    color: #6F9B3C;
  }

  input {
    width: 64%;
    padding: 22px;
    background-color: rgba(240, 240, 240, 1);
    border: none;
    border-radius: 8px;
    font-size: 26px;
    margin-bottom: ${(props) => props.inputMargin};
  }

  input:focus {
    outline: none;
  }

  input::-webkit-input-placeholder { /* Edge */
    color: #6F9B3C;
    font-weight: 600;
  }
  
  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #6F9B3C;
    font-weight: 600;
  }
  
  input::placeholder {
    color: #6F9B3C;
    font-weight: 600;
  }

  a {
    color: #A5CF61;
    font-size: 20px;
    margin-bottom: 140px;
  }
`;

export default AuthForm;