import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import ViewContainer from '../../shared/styles/ViewContainer';
import AuthForm from '../../shared/styles/AuthForm';
import FormButton from '../../shared/styles/FormButton';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  async function sendLogin(e) {
    e.preventDefault();

    const body = { email, password}

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sign-in`,
        body
      )

      localStorage.setItem('token', response.token);
      navigate('/last-questions');
    } catch(err) {
      alert('Ocorreu um erro durante o login');
    }
  }

  return (
    <ViewContainer>
      <AuthForm inputMargin={'44px'} onSubmit={ sendLogin }>
        <h1>WHY SCIENCE?</h1>
        <input
          type='email'
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder='Senha'
          required
        />
        <FormButton type='submit'>Entrar</FormButton>
        <Link to='/sign-up'>Ainda não tem login? Cadastre-se</Link>
      </AuthForm>
    </ViewContainer>
  );
}

export default Login;