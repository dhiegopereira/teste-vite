import './styles.css';
import { NavLink } from 'react-router-dom'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ImgSignUp from '../assets/signUp.svg'
import axios from '../../services/api'
import InputPassword from '../../Components/InputPassword';
import InputPattern from '../../Components/InputPattern';


const steps = [
  {
    label: 'Cadastre-se',
    description: `Por favor, escreva seu nome e e-mail`,
  },
  {
    label: 'Escolha uma senha',
    description:
      'Escolha uma senha segura',
  },
  {
    label: 'Cadastro realizado com sucesso',
    description: `E-mail e senha cadastrados com sucesso`,
  },
];


export default function SignUp() {

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  console.log(error)
  console.log(dataUser);

  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e) => {
    e.preventDefault()

    if (activeStep < 1) {
      return setActiveStep(0)
    }
    if (activeStep >= 2) {
      return setActiveStep(2)
    }
    if (activeStep === 1 && !dataUser.password && !repeatedPassword) {
      return setActiveStep(0)
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log(activeStep)

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataUser.name && !dataUser.email) {
      return setError("Preencha os campos nome e e-mail")
    }

    if (!dataUser.name) {
      return setError("Preencha o campo nome")
    }
    if (!dataUser.email) {
      return setError("Preencha o campo e-mail")
    }

    if (Number(dataUser.name)) {
      return setError("Preencha o campo nome apenas com letras")
    }


    setActiveStep(+1)

    if (dataUser.name && dataUser.email && activeStep === 0) {
      setError("")
    }

    if (dataUser.name && dataUser.email && activeStep === 1) {
      if (!dataUser.password && !repeatedPassword && activeStep === 1) {
        setError("Preencha os campos de senha")
        return
      }

      if (!dataUser.password && activeStep === 1) {
        setError("Preencha o campo senha")
        return
      }

      if (!repeatedPassword && activeStep === 1) {
        setError("Preencha o campo confirmação de senha")
        return
      }
      if (dataUser.password != repeatedPassword && activeStep === 1) {
        setError("Os campos senha não conferem")
        return
      }
      setError("")


      try {
        const response = await axios.post('/signUp', {
          name: dataUser.name,
          email: dataUser.email,
          password: dataUser.password
        })

        setActiveStep(+2)
        if (response.status > 204) {

          return
        }
        console.log("resposta correta da minha api(try)" + response.data)
        setError("")
      } catch (error) {
        setError(error.response.data.message)
        console.log("Caí no catch" + error.response.data.message)
      }
    }

  }

  return (

    <div className='containerSignUp'>
      <div className='left'>  
        <Stepper activeStep={activeStep} orientation="vertical" >
          {steps.map((step) => (
            <Step key={step.label}>
              <div
                className='icon'
                disabled={activeStep === 0}
                onClick={handleBack}>
              </div>
              <StepLabel>
                {step.label}
                <Typography className='stepContent'>{step.description}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper> 
      </div>
      <div className='right'>
        <form onSubmit={handleSubmit} className="formBox">
          {activeStep === 0 && (
            <div className='formSignUp'>
              <h2 className='rightTitle'>Adicione seus dados</h2>
              <label className='formSignUpLabel'>Nome*</label>
              <InputPattern
              type='text'
              name='name'
              placeholder='Digite seu nome'
              value={dataUser.name}
              onChange={handleChange}
              />
              <label className='formSignUpLabel'>E-mail*</label>
              <InputPattern
                type='email'
                name='email'
                placeholder='Digite seu e-mail'
                value={dataUser.email}
                onChange={handleChange}
              />
              <h2 className='errorMessage signUpError'>{error}</h2>

              <button
                className='patternBtn'
                onClick={(e) => handleNext}
              >Continuar</button>


              <span className='informationSignUp'>
                Já possui uma conta? Faça seu <NavLink className='navSignUp' to='/SignIn'>Login</NavLink>
              </span>
              <div className='alignPagination'>
              <div className='paginationSignUp'>
                <div className='selectPagination'>
                </div> <div className='pagination'></div>
                <div className='pagination'></div>
              </div>
              </div>
            </div>
          )}

          {activeStep === 1 &&

          
              <div className='formSignUp'>
                <h2 className='rightTitle'>Escolha uma senha</h2>
                <label className='formSignUpLabel'>Senha*</label>
                <InputPassword onChange={handleChange} value={dataUser.password} />
                <label className='formSignUpLabel'>Repita a senha*</label>
                <InputPassword onChange={(e) => setRepeatedPassword(e.target.value)} value={repeatedPassword} />
                <div>
                  <h2 className='errorMessage signUpError'>{error}</h2>
                </div>
                <button
                  className='patternBtn'
                  onClick={(e) => handleNext}
                  onSubmit={handleSubmit}
                  type="submit"
                >Finalizar cadastro</button>


                <span className='informationSignUp'>
                  Já possui uma conta? Faça seu <NavLink className='navSignUp' to='/SignIn'>Login</NavLink>
                </span>
                <div className='alignPagination'>
                <div className='paginationSignUp'>
                  <div className='pagination'></div>
                  <div className='selectPagination'></div>
                  <div className='pagination'></div>
                </div>
                </div>
              </div>
            

          }
        </form>
        {activeStep === 2 &&

          <div className='right'>
            <div className='register'>
              <img src={ImgSignUp} alt='cadastro concluido' />
              <h1>Cadastro realizado com sucesso!</h1>
            </div>
            <button className='patternBtn'><NavLink className="navPattern"  to='/SignIn'> Ir para Login</NavLink></button>
            <div className='paginationSignUp'>
              <div className='pagination'></div>
              <div className='pagination'></div>
              <div className='selectPagination'></div>
            </div>
          </div>

        }


      </div>
    </div>

  )

}