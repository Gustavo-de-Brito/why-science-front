import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import ViewContainer from '../../shared/styles/ViewContainer';
import AuthForm from '../../shared/styles/AuthForm';
import FormButton from '../../shared/styles/FormButton';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  async function sendLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = { email, password}

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign-in`,
        body
      )

      localStorage.setItem('token', response.token);
      navigate('/last-questions');
    } catch(err) {
      if(err.response.status === 401) {
        return alert('Email e/ou senha inválido(s)');
      }

      alert('Ocorreu um erro durante o login');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ViewContainer>
      <AuthForm inputMargin={'44px'} onSubmit={ sendLogin }>
        <h1>WHY SCIENCE?</h1>
        <input
          type='email'
          value={ email }
          disabled={ isLoading }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder='Email'
          required
          data-cy='email'
        />
        <input
          type='password'
          value={ password }
          disabled={ isLoading }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder='Senha'
          required
          data-cy='password'
        />
        <FormButton data-cy='login-button' disabled={ isLoading } type='submit'>
        { isLoading ? <ThreeDots height="34" width="100" color="white"/> : 'Entrar' }
        </FormButton>
        <Link to='/sign-up'>Ainda não tem login? Cadastre-se</Link>
      </AuthForm>
    </ViewContainer>
  );
}

export default Login;