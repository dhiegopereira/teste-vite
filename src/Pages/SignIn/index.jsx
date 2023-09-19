import './styles.css';
import banner from '../../assets/banner.svg'
import { Link, useNavigate } from "react-router-dom";
import InputPassword from '../../Components/InputPassword';
import InputPattern from '../../Components/InputPattern';
import { useState, } from 'react';
import { setItem } from '../../utils/localStorage';
import api from '../../services/api';


export default function SignIn() {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })


  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    const regex = /@[^!@#$%^&*(),.?":{}|<>]+/;

    if (!loginData.email && !loginData.password) {
      return setLoginError("Preencha todos os campos");
    }

    if (!loginData.email) {
      return setLoginError("O campo e-mail deve ser preenchido");
    }

    if (!regex.test(loginData.email)) {
      return setLoginError("Insira um endereço de email válido");
    }

    if (!loginData.password) {
      return setLoginError("Insira a sua senha");
    }

    setLoginError("");
    try {
      const response = await api.post('/login', {
        email: loginData.email,
        password: loginData.password
      });

      const { token, name } = response.data;
      setItem("token", token);
      setItem("nome", name);
      navigate('/home');


    } catch (error) {
      setLoginError(error.response.data.message)

    }

  }
  return (
    <>
      <div className='signInContent'>
        <div className='signInBanner'
          style={{ backgroundImage: `url(${banner})` }}>
          <h1 className='signInBannerTitle'>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
        </div>
        <div className='signInLogin'>
          <div className='loginContainer'>
            <h1 className='loginContainerTitle'>Faça seu login!</h1>
            <form className='loginContainer' onSubmit={handleSubmit} noValidate>
              <label htmlFor="e-mail" className='loginLabel'>E-mail</label>
              <InputPattern type='email' placeholder="Digite seu email" name="email" onChange={handleChange} value={loginData.email} />
              <div className='loginLabelPassword'>
                <label htmlFor="password">Senha</label>
                <p>Esqueceu a senha?</p>
              </div>
              <InputPassword onChange={handleChange} value={loginData.password} />
              <div className='loginErrorContent'>
                <h1 className='errorMessage'>{loginError}</h1>
              </div>
              <button className='patternBtn'
                type='submit'>Entrar</button>
            </form>
            <h2 className='loginToRegister'>Ainda não possui uma conta? <Link to="/" className='linkToRegister'>Cadastre-se</Link></h2>
          </div>
        </div>
      </div>
    </>
  )
}
