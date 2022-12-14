import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

import ViewContainer from '../../shared/styles/ViewContainer';
import AuthForm from '../../shared/styles/AuthForm';
import FormButton from '../../shared/styles/FormButton';

async function imageValidation(url) {
  try {
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg))/i;

    const response = await axios.get(url);
    const imageUrl = response.request.responseURL;

    if(!imageUrlRegex.test(imageUrl)) {
      return false;
    }

    return imageUrl;
  } catch {
    return false
  }
}

function SignUp() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();

  async function sendSignUp(e) {
    e.preventDefault();
    
    const isImageValid = await imageValidation(imageUrl);

    if(password !== confirmPassword) {
      setIsLoading(false)
      return alert('As senhas devem ser iguais');
    } else if(!isImageValid) {
      setIsLoading(false)
      return alert('A URL da imagem é inválida');
    }

    const body = {
      name,
      email,
      password,
      confirmPassword,
      imageUrl: isImageValid
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);

      navigate('/');
    } catch(err) {
      console.log(err)
      alert('Não foi possível realizar o cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewContainer>
      <AuthForm inputMargin={'14px'} onSubmit={ sendSignUp }>
        <h1 style={{ margin: '70px 0 60px 0' }}>WHY SCIENCE?</h1>
        <input
          type='text'
          value={ name }
          disabled={ isLoading }
          onChange={ (e) => setName(e.target.value) }
          placeholder='Username'
          required
          data-cy='name'
        />
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
        <input
          type='password'
          value={ confirmPassword }
          disabled={ isLoading }
          onChange={ (e) => setConfirmPassword(e.target.value) }
          placeholder='Confirmar senha'
          required
          data-cy='confirm-password'
        />
        <input
          type='text'
          value={ imageUrl }
          disabled={ isLoading }
          onChange={ (e) => setImageUrl(e.target.value) }
          placeholder='URL da imagem'
          required
          data-cy='image-url'
        />
        <FormButton type='submit' disabled={ isLoading } data-cy='register-button' >
          { isLoading ? <ThreeDots height="34" width="100" color="white"/> : 'Cadastrar' }
        </FormButton>
        <Link style={{ marginBottom: '60px' }} to='/'>Já possui uma conta? Faça login!</Link>
      </AuthForm>
    </ViewContainer>
  );
}

export default SignUp;