import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <ViewContainer>
      <AuthForm>
        <h1>WHY SCIENCE?</h1>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Senha' />
        <FormButton type='submit'>Entrar</FormButton>
        <Link>Ainda não tem login? Cadastre-se</Link>
      </AuthForm>
    </ViewContainer>
  );
}

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #A5CF61;
  font-family: 'Roboto', sans-serif;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 880px;
  background-color: #FFFFFF;
  border-radius: 10px;

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
    margin-bottom: 44px;
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

const FormButton = styled.button`
  width: 64%;
  padding: 20px;
  margin: 18px 0 20px 0;
  background-color: #6F9B3C;
  font-size: 30px;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
`;

export default Login;