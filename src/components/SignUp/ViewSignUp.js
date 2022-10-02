import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ViewContainer from '../../shared/styles/ViewContainer';
import AuthForm from '../../shared/styles/AuthForm';
import FormButton from '../../shared/styles/FormButton';

function SignUp() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const navigate = useNavigate();

  return (
    <ViewContainer>
      <AuthForm inputMargin={'14px'} onSubmit={ (e) => e.preventDefault() }>
        <h1 style={{ margin: '70px 0 60px 0' }}>WHY SCIENCE?</h1>
        <input
          type='text'
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder='Username'
          required
        />
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
        <input
          type='password'
          value={ confirmPassword }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          placeholder='Confirmar senha'
          required
        />
        <input
          type='text'
          value={ imageUrl }
          onChange={ (e) => setImageUrl(e.target.value) }
          placeholder='URL da imagem'
          required
        />
        <FormButton type='submit'>Cadastrar</FormButton>
        <Link style={{ marginBottom: '60px' }} to='/'>Já possui uma conta? Faça login!</Link>
      </AuthForm>
    </ViewContainer>
  );
}

export default SignUp;