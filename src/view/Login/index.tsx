
/* Com */
import LoginBg from './Bg/LoginBg';
import LoginForm from './Form/index'
import RegisterFrom from './Form/Regitser';

/* hooks */
import { useState } from 'react'

/* style */
import './login.less'

function Login() {
  const [formType, _toggleForm] = useState('login')

  function toggleForm() {
    if (formType === 'login')
      _toggleForm('regitser')
    else _toggleForm('login')
  }

  return (<div className='login_page'>
    <div className='dots_bg'>
      <LoginBg />
    </div>
    <ul className={formType === 'login' ? 'form_box' : 'form_box register_form'}>
      <li className="login item">
        <div className="title">
          <svg className='svg_title'>
            <text className='text'>
              Login
              <animate attributeName="stroke-dashoffset" values="150;0" dur="4s" repeatCount="indefinite" />
            </text>
          </svg>
        </div>
        <div ><LoginForm toggleForm={toggleForm} /></div>
      </li>

      <li className="regitser item">
        <div className="title">
          <svg className='svg_title'>
            <text className='text'>
              Regitser
              <animate attributeName="stroke-dashoffset" values="150;0" dur="4s" repeatCount="indefinite" />
            </text>
          </svg>
        </div>
        <div><RegisterFrom toggleForm={toggleForm} /></div>
      </li>
    </ul>
  </div >)
}

export default Login