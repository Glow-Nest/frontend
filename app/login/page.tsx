import LoginNavbar from '@/components/common/LoginSignUpNavbar'
import LoginPage from '@/components/login/LoginPage'
import React from 'react'

function Login() {
  return (
    <>
      <LoginNavbar type='login'/>
      <LoginPage/>
    </>
  )
}

export default Login